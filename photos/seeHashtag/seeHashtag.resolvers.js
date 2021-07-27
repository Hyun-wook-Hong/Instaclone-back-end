import client from "../../client";
// public
export default {
    Query: {
        seeHashtag: (_, {hashtag }) => 
        client.hashtag.findUnique({
            where: {
                hashtag,
            },
        }),
    },

};