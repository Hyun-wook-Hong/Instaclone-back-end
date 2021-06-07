export default{
    Query:{
        seeFollowing: async(_, { username, cursor }) => {
            const ok = await client.user
            .findUnique({ 
                where: { username },
                select: { id: true }, 
            });
            if(!ok){
                return{
                    ok: false,
                    error: "User not found",
                };
            }
        },
    },
};