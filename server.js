/* Apollo Server & GraphQL variable */
require("dotenv").config();
import http from "http";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";
import { graphqlUploadExpress } from "graphql-upload"; // added for createReamStream issue
import pubsub from "./pubsub";

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
  uploads: false, // added for createReamStream issue
  context: async(ctx) => {
    // HTTP는 REQ-RES가 있지만, WS는 없음.
    // WS도 다루기 위해 구문을 바꿈
    if(ctx.req){
      return{
        loggedInUser: await getUser(ctx.req.headers.token),
        protectResolver,
      };
    } else{
      const { connection: {context} } = ctx;
      return{
        loggedInUser: context.loggedInUser
      };
    }
  },

  subscriptions: {
    onConnect: async ({token}) => {
      if(!token){
        throw new Error("You can't listen.");
      }
      const loggedInUser = await getUser(token);
      return{
        loggedInUser,
      };
    },
  },
});

const app = express();
app.use(graphqlUploadExpress());
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer
    .listen(PORT, 
      () => 
      {
        console.log(`🚀 Server is running on http://localhost:${PORT}/ ✔`)
      });