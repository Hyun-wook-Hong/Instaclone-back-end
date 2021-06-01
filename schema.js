import {
  loadFilesSync,
  makeExecutableSchema,
  mergeResolvers,
  mergeTypeDefs,
} from "graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(
  `${__dirname}/**/*.resolvers.js`
);

// apollo server는 typeDefs와 resolver를 주면 자동으로 schema를 생성한다.
// schema = typeDefs  + resolver;

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);

//const schema = makeExecutableSchema({ typeDefs, resolvers });

//export default schema;