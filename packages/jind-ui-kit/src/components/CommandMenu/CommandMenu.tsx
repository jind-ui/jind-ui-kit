import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type CSSProperties,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { transition, mergeStyles } from '../../utils/styles';
import { Portal } from '../../primitives/Portal/Portal';

export interface CommandItem {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  group?: string;
  shortcut?: string;
  onSelect: () => void;
  disabled?: boolean;
}

export interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
  placeholder?: string;
  emptyMessage?: string;
  footer?: ReactNode;
  style?: CSSProperties;
}

export function CommandMenu({
  open,
  onOpenChange,
  items,
  placeholder = 'Search commands...',
  emptyMessage = 'No results found.',
  footer,
  style,
}: CommandMenuProps) {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = items.filter((item) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      item.label.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.group?.toLowerCase().includes(q)
    );
  });

  const groups = new Map<string, CommandItem[]>();
  for (const item of filtered) {
    const key = item.group ?? '';
    const existing = groups.get(key);
    if (existing) {
      existing.push(item);
    } else {
      groups.set(key, [item]);
    }
  }

  const flatItems = filtered.filter((i) => !i.disabled);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    function handleGlobalKey(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onOpenChange(false);
      }
    }
    document.addEventListener('keydown', handleGlobalKey);
    return () => document.removeEventListener('keydown', handleGlobalKey);
  }, [open, onOpenChange]);

  const scrollActiveIntoView = useCallback(
    (index: number) => {
      const list = listRef.current;
      if (!list) return;
      const el = list.children[index] as HTMLElement | undefined;
      el?.scrollIntoView({ block: 'nearest' });
    },
    [],
  );

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.min(activeIndex + 1, flatItems.length - 1);
      setActiveIndex(next);
      scrollActiveIntoView(next);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = Math.max(activeIndex - 1, 0);
      setActiveIndex(prev);
      scrollActiveIntoView(prev);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = flatItems[activeIndex];
      if (item) {
        item.onSelect();
        onOpenChange(false);
      }
    }
  }

  function handleBackdropClick() {
    onOpenChange(false);
  }

  if (!open) return null;

  const transitionValue = transition('background-color');

  const overlayStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '15vh',
    zIndex: 9999,
  };

  const panelStyle: CSSProperties = mergeStyles(
    {
      width: '100%',
      maxWidth: 540,
      maxHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.semantic.surface.card,
      borderRadius: theme.radius.md,
      boxShadow: theme.shadow.menu,
      border: `1px solid ${theme.semantic.border.subtle}`,
      overflow: 'hidden',
    },
    style,
  );

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    border: 'none',
    borderBottom: `1px solid ${theme.semantic.border.subtle}`,
    backgroundColor: 'transparent',
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[15],
    color: theme.semantic.text.primary,
    outline: 'none',
    boxSizing: 'border-box',
  };

  const groupLabelStyle: CSSProperties = {
    padding: '8px 16px 4px',
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[11],
    fontWeight: theme.fontWeight.semibold,
    color: theme.semantic.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  };

  const emptyStyle: CSSProperties = {
    padding: '24px 16px',
    textAlign: 'center',
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    color: theme.semantic.text.muted,
  };

  const footerStyle: CSSProperties = {
    padding: '8px 16px',
    borderTop: `1px solid ${theme.semantic.border.subtle}`,
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[12],
    color: theme.semantic.text.muted,
    display: 'flex',
    gap: 16,
  };

  let flatIndex = -1;

  return (
    <Portal>
      <div style={overlayStyle} onClick={handleBackdropClick}>
        <div
          role="dialog"
          aria-label="Command menu"
          style={panelStyle}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            style={inputStyle}
            aria-label="Search commands"
            autoComplete="off"
          />

          <div
            ref={listRef}
            role="listbox"
            style={{ overflowY: 'auto', flex: 1, padding: '4px 0' }}
          >
            {filtered.length === 0 && (
              <div style={emptyStyle}>{emptyMessage}</div>
            )}

            {Array.from(groups.entries()).map(([group, groupItems]) => (
              <div key={group || '__ungrouped'}>
                {group && <div style={groupLabelStyle}>{group}</div>}
                {groupItems.map((item) => {
                  if (!item.disabled) flatIndex++;
                  const isActive = !item.disabled && flatIndex === activeIndex;

                  const itemStyle: CSSProperties = {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 16px',
                    cursor: item.disabled ? 'not-allowed' : 'pointer',
                    backgroundColor: isActive
                      ? theme.semantic.surface.hover
                      : 'transparent',
                    opacity: item.disabled ? 0.5 : 1,
                    transition: transitionValue,
                    border: 'none',
                    width: '100%',
                    textAlign: 'left',
                    fontFamily: theme.fontFamily.sans,
                    outline: 'none',
                  };

                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={isActive}
                      aria-disabled={item.disabled || undefined}
                      style={itemStyle}
                      onClick={() => {
                        if (item.disabled) return;
                        item.onSelect();
                        onOpenChange(false);
                      }}
                      onMouseEnter={() => {
                        if (!item.disabled) {
                          const idx = flatItems.indexOf(item);
                          if (idx >= 0) setActiveIndex(idx);
                        }
                      }}
                    >
                      {item.icon && (
                        <i
                          className={`iconoir-${item.icon}`}
                          style={{
                            fontSize: 18,
                            color: theme.semantic.icon.muted,
                          }}
                          aria-hidden="true"
                        />
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: theme.fontSize[14],
                            fontWeight: theme.fontWeight.medium,
                            color: theme.semantic.text.primary,
                          }}
                        >
                          {item.label}
                        </div>
                        {item.description && (
                          <div
                            style={{
                              fontSize: theme.fontSize[12],
                              color: theme.semantic.text.muted,
                              marginTop: 1,
                            }}
                          >
                            {item.description}
                          </div>
                        )}
                      </div>
                      {item.shortcut && (
                        <kbd
                          style={{
                            fontSize: theme.fontSize[11],
                            fontFamily: theme.fontFamily.mono,
                            color: theme.semantic.text.muted,
                            padding: '2px 6px',
                            borderRadius: theme.radius.xs,
                            border: `1px solid ${theme.semantic.border.subtle}`,
                            backgroundColor: theme.semantic.surface.subtle,
                          }}
                        >
                          {item.shortcut}
                        </kbd>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {footer && <div style={footerStyle}>{footer}</div>}
        </div>
      </div>
    </Portal>
  );
}
