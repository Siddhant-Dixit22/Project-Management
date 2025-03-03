import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponeType = InferResponseType<typeof client.api.tasks[":taskId"]["$patch"], 200>;
type RequestType = InferRequestType<typeof client.api.tasks[":taskId"]["$patch"]>;

export const useUpdateTask = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<
    ResponeType,
    Error,
    RequestType
    >({
        mutationFn: async ({ json, param }) => {
            const respone = await client.api.tasks[":taskId"]["$patch"]({ json, param });

            if (!respone.ok){
                throw new Error("Failed to update task")
            }

            return await respone.json();
        },
        onSuccess: ({ data }) => {
            toast.success("Task updated");
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["task", data.$id] });

        },
        onError: () => {
            toast.error("Failed to update task");
        }
    });

    return mutation;
};