import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponeType = InferResponseType<typeof client.api.tasks["bulk-update"]["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.tasks["bulk-update"]["$post"]>;

export const useBulkUpdateTasks = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
    ResponeType,
    Error,
    RequestType
    >({
        mutationFn: async ({ json }) => {
            const respone = await client.api.tasks["bulk-update"]["$post"]({ json });

            if (!respone.ok){
                throw new Error("Failed to update tasks")
            }

            return await respone.json();
        },
        onSuccess: () => {
            toast.success("Tasks updated");
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
        onError: () => {
            toast.error("Failed to update tasks");
        }
    });

    return mutation;
};