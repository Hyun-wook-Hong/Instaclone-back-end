import client from "../client";

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
                // 2. hash password
                
                // 3. save and return the user
            },
    }
}