import { gql } from "apollo-server";

// scalar Upload - added for createReamStream issue
export default gql`
    scalar Upload
    type MutationResponse{
        ok: Boolean!
        error: String
    }
`;