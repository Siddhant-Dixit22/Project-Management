import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface UseGetTasksProps {
    workspaceId: string;
};

export const useGetTasks = ({
    workspaceId,
} : UseGetTasksProps) => {
    const query = useQuery({
        queryKey: ["tasks", workspaceId],
        queryFn: async () => {
            const response = await client.api.tasks.$get({
                query: { workspaceId },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch tasks")
            }
            // Copilot suggestion
            const jsonResponse = await response.json();
            if (!('data' in jsonResponse)) {
                throw new Error("Failed to fetch tasks");
            }
            const { data } = jsonResponse;

            return data;
        },
    });

    return query;
}