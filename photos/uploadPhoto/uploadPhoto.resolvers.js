import client from "../../client";
import { processHashtags } from "../photos.utils";
import {protectedResolver} from "../../users/users.utils";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
    Mutation: {
        uploadPhoto: protectedResolver(async (_, {
            file,
            caption
        }, {loggedInUser}) => {
            let hashtagObj = null;
            // I love #food
            if (caption) {
                // 한+영 해쉬태그 정규 표현식으로 추출 /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g
                hashtagObj = processHashtags(caption);
            }
            // save the photo WITH the parsed hashtags add the photo to the hashtags
            const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
            return client.photo.create(
                {
                    data: {
                        file: fileUrl,
                        caption,
                        user: {
                            connect: {
                                id: loggedInUser.id,
                            }
                        },
                        ...(hashtagObj.length > 0 && {
                            hashtags: {
                                connectOrCreate: hashtagObj
                            }
                        })
                    }
                });
        },)
    }
};