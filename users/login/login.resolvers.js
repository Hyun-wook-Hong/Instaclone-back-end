import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default{
    Mutation: {
        // login 기능은 User의 상태를 '변화'시키기 때문에 Mutation으로 분류하는 것이 맞다.
        login: async(_, {username, password}) => {
        // fine user with args.username
        const user = await client.user.findFirst({where:{username}});
            if(!user){
                    return{
                            ok:false,
                            error: "User not found.",
                        };
            }
        // check password with args.password
        const passwordOk = await bcrypt.compare(password, user.password);
        if(!passwordOk){
            return{
                ok: false,
                error: "Incorrect password.",
                };
        }
        // issue a token and send it to the user --> use json web token
        // token은 서버가 프론트엔드에 연결되어 있지 않을 때 or 따로 떨어져있는 경우에 사용한다.
        // 이번 인스타클론은 클라이언트가 웹 브라우저, 안드로이드, 아이폰 앱으로 각각 다를 수 있으므로 토큰 사용이 적합.
        const token = await jwt.sign({id:user.id}, process.env.SECRET_KEY);
        return {
                ok: true,
                token
        };
        
        // expire: token 유효시간 설정 가능
        },      
    },
};