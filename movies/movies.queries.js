import client from "../client";
/* resolvers 선언 */
// 사용자가 날린 Query를 해결(Resolve)해주는 역할
export default{
    Query: {
        movies: () => client.movie.findMany(),
        movie: (_, {id}) => ({ "title": "Hello", year: 2021 }),
    },
};