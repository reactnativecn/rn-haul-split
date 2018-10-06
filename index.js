const createWebpackConfig = require('haul').createWebpackConfig;
const webpack = require('webpack');
const merge = require('webpack-merge');
const HaulSplitChunkPlugin = require('./src/HaulSplitChunkPlugin');

const addtionalConfig = {
  plugins: [
    new HaulSplitChunkPlugin(),
    new webpack.BannerPlugin({
      banner: 'if (this && !this.self) { this.self = this; };\n',
      raw: true,
    }),
  ],
};

exports.createWebpackConfig = function(configBuilder) {
  return function(env) {
    const config = createWebpackConfig(configBuilder)(env);
    // replace polyfill with custom one:
    config.entry.splice(
      -2,
      1,
      require.resolve('./src/importScriptsPolyfill.js'),
    );
    return merge.smart(config, addtionalConfig);
  };
};
