/**
 * Vue configuration
 */
module.exports = {
  plugins: ['lodash'],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
      plugins: ['transform-vue-jsx', 'transform-vue-tsx'],
    },
  },
};
