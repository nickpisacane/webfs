import path from 'path'
import test from 'ava'
import { graphql } from 'graphql'

import schema from '../../../src/server/graphql'
import config from  '../../../src/config'

const testFixtures = path.resolve(
  path.join(__dirname, '..', '..', 'test_fixtures')
)
const q = query => graphql(schema, query)
config.merge({
  context: testFixtures,
  staticBaseURL: '/static'
})

test('Root Node query', async t => {
  const { data: { node } } = await q(`{
    node {
      isDirectory
      exists
      dirname
      basename
      ... on Directory {
        children {
          basename
        }
      }
    }
  }`)

  t.is(node.isDirectory, true)
  t.is(node.exists, true)
  t.is(node.dirname, '/')
  t.is(node.basename, '')
  t.truthy(node.children)
  t.is(node.children.length, 2)
})
