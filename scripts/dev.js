import path from 'path'
import webfs from '../src'
import config from '../src/config'

webfs({
  context: path.resolve(path.join(__dirname, '..', 'fixtures'))
})

console.log('useing config:\n', config.get())
