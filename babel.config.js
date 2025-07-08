module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@screens': './src/screens',
          '@screens/*': './src/screens/*',
          '@components': './src/components',
          '@components/*': './src/components/*',
          '@colors': './src/theme/colors',
        },
      },
    ],
  ],
};
