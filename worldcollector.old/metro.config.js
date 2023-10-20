const { getDefaultConfig } = require('@expo/metro-config')

const defaultConfig = getDefaultConfig(__dirname)
defaultConfig.resolver.assetExts.push('cjs', 'mjs')

module.exports = defaultConfig
