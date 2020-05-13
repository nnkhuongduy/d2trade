/* config-overrides.js */
const { useBabelRc, override } = require('customize-cra')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')

const myOverride = (config, env) => {
  config = rewireReactHotLoader(config, env)
  return config
}

const reactHotDom = (config, env) => {
  config.resolve.alias['react-dom'] = '@hot-loader/react-dom'
  return config
}

module.exports = override(
  myOverride,
  reactHotDom,
  useBabelRc()
);