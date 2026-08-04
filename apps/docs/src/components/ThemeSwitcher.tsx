import { Select } from 'jind-ui-kit';
import { themes, type ThemeKey } from '../themes';

interface ThemeSwitcherProps {
  current: ThemeKey;
  onChange: (key: ThemeKey) => void;
}

const keys = Object.keys(themes) as ThemeKey[];

const options = keys.map((key) => ({
  label: themes[key].label,
  value: key,
  swatch: themes[key].theme.semantic.fill.primary,
}));

export function ThemeSwitcher({ current, onChange }: ThemeSwitcherProps) {
  return (
    <div style={{ padding: '0 16px 12px', position: 'relative', zIndex: 10 }}>
      <Select
        value={current}
        options={options}
        onChange={(val) => onChange(val as ThemeKey)}
        style={{ width: '100%' }}
      />
    </div>
  );
}
