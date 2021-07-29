import client from "../../client";

// include: 조회 결과에 relationship을 추가해줌
// select: 조회 결과만 보여줌
export default{
    Query:{
        seePhotoLikes: async (_, {id}) => {
            const likes = await client.like.findMany({
                where: {
                    photoId: id,
                },
                select:{
                    user: {
                        select: {
                            username: true,
                        },
                    },
                },
            });
            return likes.map(like => like.user);
        }
    }
};