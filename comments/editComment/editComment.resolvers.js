import { protectedResolver } from "../../users/users.utils";
import client from "../../client";

export default{
    Mutation:{
        editComment: protectedResolver(async(_, {id, payload}, {loggedInUser}) =>{
            const comment = await client.comment.findUnique({
                where: {
                    id,
                },
                select:{
                    userId: true
                }
            });
            if(!comment){
                return{
                    ok: false,
                    error: "Commnet not found.",
                };
            }else if(comment.userId !== loggedInUser.id){
                return{
                    ok: false,
                    error: "Not authorized.",
                }
            }else{
                await client.comment.update({
                    where:{
                        id,
                    },
                    data:{
                        payload,
                    },
                });
                return{
                    ok: true,
                };
            }
         }
        ),
    },
};