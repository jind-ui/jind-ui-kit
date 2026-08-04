import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: '#f2f7fa' },
        { name: 'card', value: '#ffffff' },
        { name: 'dark', value: '#23262f' },
      ],
    },
  },
};

export default preview;
