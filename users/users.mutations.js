import client from "../client";
import bcrypt from "bcrypt";

/* 사용자 계정 생성 Mutation */
export default{
    Mutation: {
        createAccount: async (
            _, 
            { firstName, lastName, username, email, password }
            ) => {
                // 예외처리 구문 추가
                try{
                    // 1. check if username or email are already on DB
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            {
                                username, 
                            },
                            {
                                email,
                            }
                        ],
                    },
                }); 
                // 이미 등록된 사용자라면 or 사용중인 이메일이라면 throw error   
                if(existingUser){
                    throw new Error("This username/password is already taken.");
                }
                // 2. hash password --> hashing 사용해서 암호화 + rainbow table 공격 방지를 위한 salting
                const uglyPassword = await bcrypt.hash(password, 10);
                
                // 3. save and return the user
                return client.user.create({ 
                data: {
                    username, 
                    email, 
                    firstName, 
                    lastName, 
                    password:uglyPassword,
                } });
                }catch(e){
                    return e;
                }
            },
    },
};