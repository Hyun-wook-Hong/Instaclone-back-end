import client from "../../client";

export default {
    Query: {
        seeProfile: (_, {username}) => client.user.findUnique({
            where:{
                username,
            },
            // include: DB에 있는 사용자 관계를 가지고와줌
            include: {
                following: true,
                followers: true,
            }
        }),
    },
}