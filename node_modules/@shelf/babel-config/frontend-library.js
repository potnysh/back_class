/**
 * Frontend library
 */
module.exports = {
  plugins: [
    'babel-plugin-lodash',
    '@babel/plugin-proposal-class-properties',
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: ['last 4 versions'],
      },
    ],
    '@babel/preset-typescript',
  ],
};
