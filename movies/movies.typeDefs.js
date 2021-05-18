import { gql } from "apollo-server";
/* GraphQL 쿼리 Type 선언 */
// 5/18 comment: 나중에 이 typeDefs 스키마 부분이 좋아요, 사진, 메세지 등등 기능이 많은만큼 엄청 커질거라.. 파일 구조를 나누게될것임
// 하기 type definition과 prisma에서 생성한 스키마 형태를 일치 시키는게 중요함 (문법은 조금 다름)
export default gql`
    type Movie{
        id:        Int!           
        title:     String! 
        year:      Int!
        genre:     String
        createdAt: String!  
        updatedAt: String! 
    }
    type Query{
        movies: [Movie]
        movie: Movie
    }
    type Mutation{
        createMovie(title: String!, year: Int!, genre: String): Movie
        deleteMovie(id: Int!): Movie
        updateMovie(id: Int!, year: Int!): Movie
    }
`;