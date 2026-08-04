import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { JindProvider } from 'jind-ui-kit';
import { App } from './App';
import { themes, type ThemeKey } from './themes';
import './styles.css';

function Root() {
  const [themeKey, setThemeKey] = useState<ThemeKey>('earthy');
  const currentTheme = themes[themeKey].theme;

  return (
    <BrowserRouter>
      <JindProvider theme={currentTheme}>
        <App themeKey={themeKey} onThemeChange={setThemeKey} />
      </JindProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
