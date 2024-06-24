module.exports = {
  plugins: ['@babel/plugin-syntax-import-assertions'],
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: '18',
        },
      },
    ],
  ],
};
