const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const webpack = require('webpack')
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    //configuration for workbox plugins for a service worker and manifest file.
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),

      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE',
      }),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: './src-sw.js',
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: "J.A.T.E",
        description: 'Take Notes with JavaScript syntax highlighting!',
        background_color: '#225caC',
        theme_color: '#225caC',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
          },       
        ],
      }),
      
    ],

    //CSS loaders and babel to webpack.
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,

          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
