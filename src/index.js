import config from './config'
import createServer from './server'

// TODO: Document valid options.
export default function webfs (opts = {}) {
  config.merge(opts)

  const server = createServer()
  server.listen(config.get('port'), () => {
    // TODO: Some fancy logging.
    console.log(`WebFS running on port: ${config.get('port')}`)
  })
}
