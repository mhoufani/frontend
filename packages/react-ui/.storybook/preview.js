import 'design-system/themes/theme-default.scss';
import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
