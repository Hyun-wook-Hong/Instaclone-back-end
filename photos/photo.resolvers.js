import client from "../client";
export default {
    Photo: {
        // 사진 작성자 (유저)
        user: ({userId}) => {
            return client
                .user
                .findUnique({
                    where: {
                        id: userId
                    },
                });
        },
        hashtags: ({id}) => client
            .hashtag
            .findMany({
                where: {
                    photos: {
                        some: {
                            id
                        },
                    },
                },
            }),
        // 사진 좋아요 갯수
        likes: ({ id }) => client.like.count({
            where: {
                photoId: id,
            }
        }),
        comments: ({id}) => client.comment.count({
            where:{
                photoId: id,
            }
        })
    },
    Hashtag: {
        // 필드 안에 Resolver를 작성할수도 있음
        photos: ({ id }, {page}, {loggedInUser}) => {
            return client.hashtag.findUnique({
                where: {
                    id,
                },
            })
            .photos();
        },
        // 카운팅 함수가 있음. count()
        totalPhotos: ({ id }) => client.photo.count({
            where: {
                hashtags: {
                    some: {
                        id,
                    },
                },
            },
        }),
    },
};