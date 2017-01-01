import {
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInterfaceType
} from 'graphql'

const fields = () => ({
  dirname: { type: GraphQLString },
  basename: { type: GraphQLString },
  extname: { type: GraphQLString },
  exists: { type: GraphQLBoolean },
  size: { type: GraphQLInt },
  createdAt: { type: GraphQLString },
  updatedAt: { type: GraphQLString },
  accessedAt: { type: GraphQLString },
  isDirectory: { type: GraphQLBoolean },
  staticURL: { type: GraphQLString },
  previewURL: { type: GraphQLString }
})

export const NodeType = new GraphQLInterfaceType({
  name: 'Node',
  resolveType: node => node.isDirectory ? DirectoryType : FileType,
  fields
})

export const FileType = new GraphQLObjectType({
  name: 'File',
  interfaces: [NodeType],
  fields: () => Object.assign(fields(), {
    // TODO: Data fields?
  })
})

export const DirectoryType = new GraphQLObjectType({
  name: 'Directory',
  interfaces: [NodeType],
  fields: () => Object.assign(fields(), {
    children: {
      type: new GraphQLList(NodeType),
      resolve: node => node.children()
    }
  })
})
