export const processHashtags = (caption) => {
    // caption에 해시태그가 없으면 빈 배열을 반환하도록 유도
    const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || [];
    return hashtags.map(hashtag => ({
        where: {
            hashtag
        }, 
        create: {
            hashtag
        }}));
};