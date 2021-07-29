import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
export default{
    // Feed를 보는 User가 누구인지 분명이 해야함
    Query:{
        seeFeed: protectedResolver((_, __, {loggedInUser}) => 
        // 나 or Follower 목록에 내 아이디가 있는 유저들의 Photo를 Feed에 조회하여 표시
        client.photo.findMany({
            where:{
                OR: [
                    {
                        user:{
                            followers: {
                                some:{
                                    id: loggedInUser.id,
                                },
                            },
                        },
                    },
                    {
                        userId: loggedInUser.id,
                    },
                ],
            },
            orderBy: {
                // Newest
                createdAt:"desc",
            }
         })
        ),
    },
};