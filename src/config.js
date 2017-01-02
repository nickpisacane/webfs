import path from 'path'

let config = {
  FS: 'LOCAL_FS',
  context: path.resolve(path.join(__dirname, '..', '..', 'fixtures')),
  staticBaseURL: '/static',
  internalStaticURL: '__internal__',
  publicStaticURL: '__static__'
}

export default {
  set (prop, value) {
    config[prop] = value
  },

  get (prop) {
    if (!prop) return Object.assign({}, config)
    return config[prop]
  },

  merge (opts = {}) {
    config = Object.assign({}, config, opts)
  }
}
