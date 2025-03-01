import { differenceInDays, format } from "date-fns";

import { cn } from "@/lib/utils";

interface TaskDateProps {
    value: string;
    className?: string;
}

export const TaskDate = ({ value, className} : TaskDateProps) => {
    const today = new Date();
    const endDate = new Date(value);
    const diffInDays = differenceInDays(endDate, today);

    let textColor = "";

    if (diffInDays <=3 ) {
        textColor = "text-red-500"
    } else if (diffInDays <= 7 ) {
        textColor = "text-orange-500"
    } else if (diffInDays <= 14 ) {
        textColor = "text-yellow-500"
    } else {
        textColor = "text-color-foreground"
    }

    return (
        <div className={textColor}>
            <span className={cn("truncate", className)}>
                {format(value, "PPP")}
            </span>
        </div>
    );
};