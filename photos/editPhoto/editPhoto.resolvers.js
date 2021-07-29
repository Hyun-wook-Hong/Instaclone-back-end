import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

// protected Resolver (로그인한 작성자만 수정 가능해야 함.)
export default{
    Mutation:{
        editPhoto: protectedResolver(async(_, {id, caption}, {loggedInUser}) =>{
            //findUnique는 PK만 search하는 특성을 이용, 그래서 id로 찾음
            //findFirst 우리의 기준에 맞는 첫번째 사진을 반환해주기 위해 사용
            const oldPhoto = await client.photo.findFirst({
               where: {
                   id,
                   userId:loggedInUser.id
               },
               include:{
                   hashtags: {
                    select: {
                        hashtag: true,
                    },
                   },
               },
           }); 
           // userId에 해당하는 사진을 못찾았다면.
           if( !oldPhoto ){
               return{
                   ok: false,
                   error: "Photo not found.",
               };
           }

           // Photo DB Update
           const photo = await client.photo.update({
               where:{
                   id
               },
               data:{
                   caption,
                   //Hashtag DB Update
                   //기존 Hashtags 연결 끊고, 캡션 검사해서 새로운 해시태그들을 업데이트 함.
                   hashtags:{
                       disconnect: oldPhoto.hashtags,
                       connectOrCreate: processHashtags(caption),
                   }
               }
           });
           return{
               ok: true,
           };
        }),
    },
};