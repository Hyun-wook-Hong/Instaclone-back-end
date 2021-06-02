/* Apollo Server & GraphQL variable */
require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";

/* 5/24 comments. Mutation, queries arguments
   (root, elements, context, info)
   root: 생략 가능, 보통 _로 적어서 무시함
   elements: 조회하는데 필요한 요소 정보
   context: 모든 resolver에서 접근가능한 정보를 넣을 수 있는 object
   info: we don't care about this.

   context는 graphql architecture를 형성하는 apollo-server에서 선언 가능
*/

// 6/2 Apollo Server → Apollo Server Express로 전환

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  //schema = resolvers + typeDefs
  resolvers,
  typeDefs,
  context: async({ req }) => {
    return{
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
    }
  }
});

const app = express();
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({ app });
app
    .listen({ port:PORT }, 
      () => 
      {
        console.log(`🚀 Server is running on http://localhost:${PORT}/ ✔`)
      });