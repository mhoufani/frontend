import { join, dirname, resolve } from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
    {
      name: `@storybook/preset-scss`,
      options: {
        rule: {
          test: /(?<!\.module).s[ca]ss$/,
        },
      },
    },
    {
      name: `@storybook/preset-scss`,
      options: {
        rule: {
          test: /\.module\.s[ca]ss$/,
        },
        cssLoaderOptions: {
          modules: {
            localIdentName: '[local]__[hash:base64:5]',
          },
        },
      },
    },
    '@etchteam/storybook-addon-css-variables-theme',
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
  },
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        configFile: resolve(__dirname, '../tsconfig.json'),
        extensions: config.resolve.extensions,
      }),
    ];
    return config;
  },
  esbuild: {
    jsx: 'automatic',
  },
};
export default config;
