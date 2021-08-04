import client from "../client";

export default {
  Room: {
    users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }) =>
      client.message.findMany({
        where: {
          roomId: id,
        },
      }),
    // 방 안에 아직 읽히지 않은, 내가 보낸 메세지가 아닌 것들의 수를 셈
    unreadTotal: ({id}, _, { loggedInUser }) => {
        if(!loggedInUser){
            return 0;
        }
        return client.message.count({
            where:{
                read: false,
                roomId: id,
                user: {
                    id:{
                        not: loggedInUser.id,
                    },
                },
            },
        });
    }
  },
};