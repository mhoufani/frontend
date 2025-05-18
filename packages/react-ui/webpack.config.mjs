import { resolve, join } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import glob from 'glob';

function getEntries(pattern) {
  const entries = {};
  glob.sync(pattern).forEach((file) => {
    const outputFileKey = file
      .replace('src/', '')
      .replace(/\.[^/.]+$/, '');
    entries[outputFileKey] = join(__dirname, file);
  });
  return entries;
}

module.exports = {
  entry: getEntries('src/atoms/**/*.{ts,tsx}'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: '/.css$/',
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
