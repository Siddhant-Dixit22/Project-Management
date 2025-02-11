import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";


type ResponeType = InferResponseType<typeof client.api.auth.login["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>;

export const useLogin = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation<
    ResponeType,
    Error,
    RequestType
    >({
        mutationFn: async ({json}) => {
            const respone = await client.api.auth.login["$post"]({json});

            if (!respone.ok){
                throw new Error("Failed to log in")
            }

            return await respone.json();
        },
        onSuccess: () => {
            toast.success("Logged in");
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["current"] });
        },
        onError: () => {
            toast.error("Failed to log in");
        }
    });

    return mutation;
};