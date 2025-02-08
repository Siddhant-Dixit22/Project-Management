import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";


type ResponeType = InferResponseType<typeof client.api.auth.logout["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.logout["$post"]>;

export const useLogout = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
    ResponeType,
    Error    
    >({
        mutationFn: async () => {
            const respone = await client.api.auth.logout["$post"]();
            return await respone.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["current"]});
        }
    });

    return mutation;
};