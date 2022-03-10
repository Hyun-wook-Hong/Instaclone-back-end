import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import client from "../../client";

const { withFilter } = require('apollo-server');

export default{
    Subscription:{
        roomUpdates:{
            //subscribe:() => pubsub.asyncIterator(NEW_MESSAGE),
            /*subscribe: withFilter(
                () => pubsub.asyncIterator(NEW_MESSAGE),
                ({ roomUpdates }, {id}) => {
                    return roomUpdates.roomId === id;
                }
            ),*/
            // 
            // 매핑된 roomId Listening중인 사용자만 보이도록 수정
            subscribe: async (root, args, context, info) => {
                const room = await client.room.findFirst({
                  where: {
                    id: args.id,
                    users:{
                        some:{
                            id: context.loggedInUser.id,
                        },
                    },
                  },
                  select: {
                    id: true,
                  },
                });
                if (!room) {
                  throw new Error("You shall not see this.");
                }
                return withFilter(
                  () => pubsub.asyncIterator(NEW_MESSAGE),
                  async ({ roomUpdates }, { id }, { loggedInUser }) => {
                    if (roomUpdates.roomId === id) {
                      const room = await client.room.findFirst({
                        where: {
                          id,
                          users: {
                            some: {
                              id: loggedInUser.id,
                            },
                          },
                        },
                        select: {
                          id: true,
                        },
                      });
                      if (!room) {
                        return false;
                      }
                      return true;
                    }
                 }
                )(root, args, context, info);
              },
        },
    },
};