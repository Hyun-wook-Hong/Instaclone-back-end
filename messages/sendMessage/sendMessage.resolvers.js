import { protectedResolver } from "../../users/users.utils";
import client from "../../client";
import pubsub from "../../pubsub";
import { NEW_MESSAGE } from "../../constants";

export default{
    Mutation:{
        sendMessage: protectedResolver(async(_, {payload, roomId, userId}, {loggedInUser}) => {
            let room = null;
            
            // Mutation args에 userId만 있다면 (첫 대화, 방을 만들어줘야 함)
            if(userId){
                const user = await client.user.findUnique({
                    where:{
                        id: userId,
                    },
                    select:{
                        id: true,
                    },
                });
                if(!user){
                    return{
                        ok: false,
                        error: "This user does not exist.",
                    };
                }
                room = await client.room.create({
                    data:{
                        users:{
                            connect:[
                                {
                                    id: userId,
                                },
                                {
                                    id: loggedInUser.id,
                                },
                            ],
                        },
                    },
                });
            }else if(roomId){
                // 해당하는 대화 방을 찾아서 메세지를 전송해야 함.
                room = await client.room.findUnique({
                    where:{
                        id: roomId,
                    },
                    select:{
                        id: true,
                    }
                });
                if(!room){
                    return{
                        ok: false,
                        error: "Room not found.",
                    };
                }
            }

            // 메세지는 아래와 같이 위 userId, roomId 판별이 끝난 후 생성
            const message = await client.message.create({
                data:{
                    payload,
                    room: {
                        connect:{
                            id: room.id,
                        },
                    },
                    user: {
                        connect: {
                            id: loggedInUser.id,
                        },
                    },
                },
            });
            // WS Publish Logic
            pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });
            return{
                ok: true,
            };
        }
    ),
  }
}