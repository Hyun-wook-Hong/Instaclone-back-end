import client from "../../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
    Mutation:{
        /* 토큰은 '현재 작성중인 사람이 나다'라는 것을 증명해주는 사인임, 관련하여 추가학습 필요*/
        editProfile: async (
            _, 
        {
            firstName,
            lastName,
            username,
            email,
            password: newPassword,
        },
        { loggedInUser }
        ) => {
            console.log(loggedInUser);

            /*password는 hash 값을 사용해야 하니 참조*/
            let uglyPassword = null;
            if(newPassword){
                uglyPassword = await bcrypt.hash(newPassword, 10);
            }

            const updatedUser = await client.user.update({ 
                where:{
                    id: loggedInUser.id,
                }, 
                data:{
                    firstName, 
                    lastName, 
                    username, 
                    email, 
                    ...(uglyPassword && {password: uglyPassword}),
                },
            });
            if(updatedUser.id){
                return { 
                    ok: true,
                }
            }else{
                return { 
                    ok: false,
                    error: "Could not update profile.",
                }
            }
        },
    },
};