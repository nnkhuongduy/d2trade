/* config-overrides.js */
const { useBabelRc, override } = require('customize-cra')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')

const myOverride = (config, env) => {
  config = rewireReactHotLoader(config, env)
  return config
}

module.exports = override(
  myOverride,
  useBabelRc()
);