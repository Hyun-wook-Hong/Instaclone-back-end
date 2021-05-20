import client from "../client";
import bcrypt from "bcrypt";

/* 사용자 계정 생성 Mutation */
export default{
    Mutation: {
        createAccount: async (
            _, 
            { firstName, lastName, username, email, password }
            ) => {
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
                } })

            },
    },
};