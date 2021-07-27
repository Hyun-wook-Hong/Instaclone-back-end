import client from "../client";
export default {
    Photo: {
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
    },
    Hashtag: {
        photos: ({ id }, args) => {
            console.log(args);
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