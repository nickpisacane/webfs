import path from 'path'

let config = {
  FS: 'LOCAL_FS',
  context: process.cwd(),
  staticBaseURL: '/__static__',
  port: 8000
}

const privateConfig = {
  internalBaseURL: '/__internal__'
}

export default {
  set (prop, value) {
    if (privateConfig.hasOwnProperty(prop)) {
      throw new Error(`Property: \`${prop}\` is unconfigurable.`)
    }
    config[prop] = value
  },

  get (prop) {
    if (!prop) return Object.assign({}, config, privateConfig)
    return config.hasOwnProperty(prop) ? config[prop] : privateConfig[prop]
  },

  merge (opts = {}) {
    config = Object.assign({}, config, opts)
  }
}
