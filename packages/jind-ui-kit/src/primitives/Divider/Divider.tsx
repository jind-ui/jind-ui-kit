import { type CSSProperties } from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  tone?: 'subtle' | 'default';
  style?: CSSProperties;
  ref?: React.Ref<HTMLHRElement>;
}

export function Divider(
  { orientation = 'horizontal', tone = 'subtle', style, ref, ...rest }: DividerProps,
) {
  const theme = useTheme();
  const color = tone === 'subtle' ? theme.semantic.border.subtle : theme.semantic.border.default;
  const isHorizontal = orientation === 'horizontal';

  const dividerStyle: CSSProperties = {
    border: 'none',
    margin: 0,
    flexShrink: 0,
    ...(isHorizontal
      ? { borderTop: `1px solid ${color}`, width: '100%' }
      : { borderLeft: `1px solid ${color}`, height: '100%', alignSelf: 'stretch' }),
    ...style,
  };

  return <hr ref={ref} role="separator" aria-orientation={orientation} style={dividerStyle} {...rest} />;
}
