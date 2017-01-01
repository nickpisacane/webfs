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
        resolve: (parent, args, request) => {
          return new Node({
            fs: config.get('FS'),
            path: args.uri || '/',
            context: config.get('context'),
            staticBaseURL: config.get('staticBaseURL')
          }).resolve()
        }
      }
    }
  })
})
