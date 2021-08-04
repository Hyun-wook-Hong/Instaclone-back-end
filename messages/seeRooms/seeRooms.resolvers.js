import { protectedResolver } from "../../users/users.utils";
import client from "../../client";

export default{
    Query:{
        seeRooms: protectedResolver(async(_, __, {loggedInUser}) => 
            client.room.findMany({
                where:{
                    users:{
                        some: {
                            id: loggedInUser.id,
                        },
                    },
                },
            })
        ),
    },
};