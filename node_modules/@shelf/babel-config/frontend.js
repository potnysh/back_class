/**
 * React components without browser boilerplate (jsx,tsx) + testing (ts/tsx)
 */
module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-styled-components',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: false,
        regenerator: true,
        useESModules: true,
        absoluteRuntime: false,
      },
    ],
  ],
  presets: ['@babel/preset-typescript', '@babel/preset-env', '@babel/preset-react'],
  env: {
    test: {
      presets: ['@babel/preset-typescript', '@babel/preset-env'],
    },
  },
};
