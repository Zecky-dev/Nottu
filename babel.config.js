module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
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
          '@context': './src/context',
          '@context/*': './src/context/*',
          '@navigation': './src/navigation',
          '@navigation/*': './src/navigation/*',
          '@utils': './src/utils',
          '@utils/*': './src/utils/*',
          '@types': './src/types',
          '@types/*': './src/types/*',
          '@api': './src/api',
          '@api/*': './src/api/*',
          '@assets': './src/assets',
          '@assets/*': './src/assets/*',
          '@hooks': './src/hooks',
          '@hooks/*': './src/hooks/*',
        },
      },
    ],
    'react-native-reanimated/plugin'
  ],
};
