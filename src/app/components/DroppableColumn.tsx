"use client";

import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";
import React from "react";

interface DroppableColumnProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
}

export default function DroppableColumn({
    id,
    children,
    className,
    ...rest
}: DroppableColumnProps) {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            data-column-id={id}
            className={clsx(className, "transition-colors duration-150", {
                "bg-sky-100": isOver,
            })}
            {...rest}
        >
            {children}
        </div>
    );
}
