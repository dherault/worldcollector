module.exports = function (api) {
  api.cache(true)

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      require.resolve('expo-router/babel'),
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
      ['module-resolver', {
        alias: {
          '~types': './src/types.ts',
          '~constants': './src/constants.ts',
          '~firebase': './src/firebase.ts',
          '~contexts': './src/contexts',
          '~hooks': './src/hooks',
          '~utils': './src/utils',
          '~components': './src/components',
          '~scenes': './src/scenes',
          '~emails': './src/emails',
          '~data': './src/data',
        },
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.cjs',
        ],
      }],
    ],
  }
}
