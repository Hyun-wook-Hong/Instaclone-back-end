import client from "../client";
export default{
    User: {
        totalFollowing: ({id}) => 
            client.user.count({
                where:{
                followers:{
                    some:{
                        id,
                    },
                },
            },
        }),
        totalFollowers: ({id}) => 
            client.user.count({
                where:{
                following:{
                    some:{
                        id,
                    },
                },
            },
        }),
        isMe: ({id}, _, {loggedInUser}) => {
            // context에 저장된 loggedInUser와 seeProfile 현재 user 비교해서 맞으면 isMe: True;
            if(!loggedInUser){
                return false;
            }
            return id === loggedInUser.id;   
        },
        isFollowing : async ({id}, _, {loggedInUser}) => {
            if(!loggedInUser){
                return false;
            }
            const exists = await client.user.count({
                where:{
                    username: loggedInUser.username,
                    following:{
                        some:{
                            id,
                        },
                    },
                },
            });
            return Boolean(exists);
        },
    },
};