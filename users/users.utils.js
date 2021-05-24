import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async(token) => {
    try {

        if(!token){
            return null;
        }
        // user가 토큰을 보내는 방식은 구조상 좋지 않으니 다음과 같이 수정함.
        // 1) user는 request를 보내며 http header에 token을 자동으로 전송하고 있다.
        // 2) 이 token을 context에 넣어서 어떤 CRUD든 사용할 수 있도록 할 수 있고, graphql 구조를 형성하고 있는 apollo-server에서 값을 지정하고, query, mutation에서 가져와 쓸 수 있다
        // 3) token은 사실 http header의 request.headers에 object로 들어 있어서 꺼내쓰면 된다.
        // 4) 클라이언트에서 request할 때 마다 user를 보내서 자동으로 token을 입력받도록 수정
        const { id } = await jwt.verify(token, process.env.SECRET_KEY);
        const user = await client.user.findUnique({ where: { id } });
        if(user) {
            return user;
        } else{
            return null;
        }
    } catch {
        return null;
    }
};