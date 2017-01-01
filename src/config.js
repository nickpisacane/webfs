import path from 'path'

export default {
  FS: 'LOCAL_FS',
  context: path.resolve(path.join(__dirname, '..', '..', 'fixtures')),
  staticBaseURL: '/static'
}
