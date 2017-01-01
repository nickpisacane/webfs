import {
  GraphQLString,
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

import { NodeType, FileType, DirectoryType } from './types'
import Node from '../lib/Node'
import config from '../../config'

export default new GraphQLSchema({
  types: [NodeType, FileType, DirectoryType],
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      node: {
        type: NodeType,
        args: {
          uri: { type: GraphQLString }
        },
        resolve: async (parent, args, request) => {
          const node = await new Node(args.uri || '/', config.FS).resolve()
          console.log('node: ', node)
          return node
        }
      }
    }
  })
})
