import path from 'path'
import test from 'ava'
import find from 'lodash/find'

import Node from '../../../src/server/lib/Node'

const testFixtures = path.resolve(
  path.join(__dirname, '..', '..', 'test_fixtures')
)
const getNode = (p = '/') => new Node({
  path: p,
  context: testFixtures,
  staticBaseURL: '/static'
}).resolve()

test('Node (LOCAL_FS)', async t => {
  const node = await getNode()

  t.is(node.basename, '')
  t.is(node.dirname, '/')
  t.is(node.staticURL, '/static/')
  t.is(node.isDirectory, true)
  t.is(node.exists, true)
})

test('Node#chilren() (LOCAL_FS)', async t => {
  const node = await getNode()
  const children = await node.children()

  t.is(children.length, 2)

  const bar = find(children, { basename: 'bar' })
  const foo = find(children, { basename: 'foo.txt' })

  t.is(bar.isDirectory, true)
  t.is(bar.exists, true)
  t.is(bar.staticURL, '/static/bar')
  t.is(bar.dirname, '/')

  t.is(foo.isDirectory, false)
  t.is(foo.exists, true)
  t.is(foo.staticURL, '/static/foo.txt')
  t.is(foo.dirname, '/')
})
