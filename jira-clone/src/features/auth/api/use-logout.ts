import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";


type ResponeType = InferResponseType<typeof client.api.auth.logout["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.logout["$post"]>;

export const useLogout = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<
    ResponeType,
    Error    
    >({
        mutationFn: async () => {
            const respone = await client.api.auth.logout["$post"]();

            if (!respone.ok){
                throw new Error("Failed to log out")
            }

            return await respone.json();
        },
        onSuccess: () => {
            toast.success("Logged out");
            router.refresh();
            queryClient.invalidateQueries();
        },
        onError: () => {
            toast.error("Failed to log out")
        }
    });

    return mutation;
};