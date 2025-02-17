import Image from "next/image";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";


interface MemberAvatarprops {
    name: string;
    className?: string;
    fallbackClassName?: string;
};


export const MemberAvatar = ({
    name,
    className,
    fallbackClassName,
}: MemberAvatarprops) => {

    return (
        <Avatar className={cn("size-5 transition border border-neutral-300 rounded-md", className)}>
            <AvatarFallback className={cn(
                "bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center", 
                fallbackClassName
                )}>
                {name.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
};