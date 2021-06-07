import { gql } from "apollo-server";
export default gql`
    type SeeFollowResult{
        ok: Boolean!
        error: String
        following: [User]
    }
    type Query{
        seFollowing(username: String!, cursor: Int): 
            SeeFollowingResult
    }
`;