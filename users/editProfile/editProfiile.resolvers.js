import fs, { createWriteStream } from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
            _, 
            {
                firstName,
                lastName,
                username,
                email,
                password: newPassword,
                bio,
                avatar,
            },
            { loggedInUser }
) => {
    /*avatar는 Promise형 Object*/
    const { filename, createReadStream } = await avatar;
    const readStream = createReadStream();
    const writeStream = createWriteStream(process.cwd() + "/uploads/" + filename);
    readStream.pipe(writeStream);

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
        bio,
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
};

export default {
    Mutation:
        {
           /* 함수형 프로그래밍은 함수가 함수를 args로 쓸 수 있음*/
           editProfile: protectedResolver(resolverFn),
        },
};