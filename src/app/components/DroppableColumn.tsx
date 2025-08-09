"use client";
import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";

export default function DroppableColumn({
    id,
    children,
    className,
}: {
    id: string;
    children: React.ReactNode;
    className?: string;
}) {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={clsx(className, {
                "bg-sky-100": isOver,
            })}
        >
            {children}
        </div>
    );
}
