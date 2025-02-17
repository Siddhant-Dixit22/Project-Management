import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponeType = InferResponseType<typeof client.api.members[":memberId"]["$delete"], 200>;
type RequestType = InferRequestType<typeof client.api.members[":memberId"]["$delete"]>;

export const useDeleteMember = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
    ResponeType,
    Error,
    RequestType
    >({
        mutationFn: async ({ param }) => {
            const respone = await client.api.members[":memberId"]["$delete"]({ param });

            if (!respone.ok){
                throw new Error("Failed to delete member")
            }

            return await respone.json();
        },
        onSuccess: () => {
            toast.success("Member removed");
            queryClient.invalidateQueries({ queryKey: ["members"] });
        },
        onError: () => {
            toast.error("Failed to delete member");
        }
    });

    return mutation;
};