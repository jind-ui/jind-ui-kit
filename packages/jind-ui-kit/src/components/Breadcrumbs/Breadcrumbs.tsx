import { type CSSProperties, type ReactNode, type Ref } from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  ref?: Ref<HTMLElement>;
  items: BreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
  style?: CSSProperties;
}

function getVisibleItems(items: readonly BreadcrumbItem[], maxItems: number | undefined): readonly BreadcrumbItem[] {
  if (maxItems == null || items.length <= maxItems) {
    return items;
  }
  const first = items[0];
  const lastCount = maxItems - 1;
  const tail = items.slice(items.length - lastCount);
  return [first, ...tail];
}

export function Breadcrumbs({
  ref,
  items,
  separator = '/',
  maxItems,
  style,
}: BreadcrumbsProps) {
  const theme = useTheme();
  const showEllipsis = maxItems != null && items.length > maxItems;
  const visibleItems = getVisibleItems(items, maxItems);

  const navStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    ...style,
  };

  const listStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: theme.space[2],
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const separatorStyle: CSSProperties = {
    color: theme.semantic.text.muted,
    userSelect: 'none',
    flexShrink: 0,
  };

  const linkStyle: CSSProperties = {
    color: theme.semantic.fill.primary,
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: theme.fontWeight.regular,
    background: 'none',
    border: 'none',
    padding: 0,
    font: 'inherit',
  };

  const activeStyle: CSSProperties = {
    color: theme.semantic.text.primary,
    fontWeight: theme.fontWeight.bold,
  };

  const ellipsisStyle: CSSProperties = {
    color: theme.semantic.text.muted,
    letterSpacing: '0.1em',
  };

  const renderSeparator = (key: string) => (
    <li key={key} role="presentation" aria-hidden="true" style={separatorStyle}>
      {separator}
    </li>
  );

  const renderItem = (item: BreadcrumbItem, isLast: boolean) => {
    if (isLast) {
      return (
        <span aria-current="page" style={activeStyle}>
          {item.label}
        </span>
      );
    }

    if (item.href != null) {
      return (
        <a href={item.href} onClick={item.onClick} style={linkStyle}>
          {item.label}
        </a>
      );
    }

    if (item.onClick != null) {
      return (
        <button type="button" onClick={item.onClick} style={linkStyle}>
          {item.label}
        </button>
      );
    }

    return <span style={{ color: theme.semantic.text.muted }}>{item.label}</span>;
  };

  const elements: ReactNode[] = [];

  if (showEllipsis) {
    // First item
    elements.push(
      <li key="item-first">{renderItem(visibleItems[0], false)}</li>,
    );
    elements.push(renderSeparator('sep-first'));

    // Ellipsis
    elements.push(
      <li key="ellipsis" style={ellipsisStyle} aria-hidden="true">
        {'...'}
      </li>,
    );
    elements.push(renderSeparator('sep-ellipsis'));

    // Remaining tail items
    for (let i = 1; i < visibleItems.length; i++) {
      const isLast = i === visibleItems.length - 1;
      elements.push(
        <li key={`item-${String(i)}`}>{renderItem(visibleItems[i], isLast)}</li>,
      );
      if (!isLast) {
        elements.push(renderSeparator(`sep-${String(i)}`));
      }
    }
  } else {
    for (let i = 0; i < visibleItems.length; i++) {
      const isLast = i === visibleItems.length - 1;
      elements.push(
        <li key={`item-${String(i)}`}>{renderItem(visibleItems[i], isLast)}</li>,
      );
      if (!isLast) {
        elements.push(renderSeparator(`sep-${String(i)}`));
      }
    }
  }

  return (
    <nav ref={ref} aria-label="Breadcrumb" style={navStyle}>
      <ol style={listStyle}>
        {elements}
      </ol>
    </nav>
  );
}
