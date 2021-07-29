import { gql } from "apollo-server";
/* 사용자 type definition, GraphQL Schema의 Prisma model과 동기화 구문 부분에 해당 */
export default gql`
    type User{
        id:             Int! 
        firstName:      String!
        lastName:       String
        username:       String!
        email:          String!
        createdAt:      String!
        updatedAt:      String!
        bio:            String
        avatar:         String
        photos:         [Photo]
        following:      [User]
        followers:      [User]
        totalFollowing: Int!
        totalFollowers: Int!
        isMe:           Boolean!
        isFollowing:    Boolean!
    }
`;

// isFollowing: Boolean!