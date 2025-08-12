"use client";
import Image from "next/image";
import TaskCard from "./TaskCard";
import { useBoardStore } from "../store/useBoardStore";
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
    DragEndEvent,
    DragMoveEvent,
} from "@dnd-kit/core";
import { useState, useEffect } from "react";

import DroppableColumn from "./DroppableColumn";
import DraggableTask from "./DraggableTask";
import BoardDetails from "./BoardDetails";
import { projectMembers } from "../lib/constants";
import { FooterType } from "../lib/types/footerType";



export default function MainBoard({ search = "" }: { search?: string }) {
    const { board, moveTask, moveTaskWithinColumn } = useBoardStore();
    const [mounted, setMounted] = useState(false);

    const filteredBoard = board.map((col) => ({
        ...col,
        tasks: search
            ? col.tasks.filter((task) =>
                task.title.toLowerCase().includes(search.toLowerCase())
            )
            : col.tasks,
    }));

    useEffect(() => {
        setMounted(true);
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const [fromColId] = String(active.id).split("-");
        const [toColId] = String(over.id).split("-");

        const fromCol = board.find((c) => c.id === fromColId);
        const toCol = board.find((c) => c.id === toColId);
        if (!fromCol || !toCol) return;

        const fromIndex = fromCol.tasks.findIndex((_, idx) => `${fromColId}-${idx}` === active.id);
        const toIndex = toCol.tasks.findIndex((_, idx) => `${toColId}-${idx}` === over.id);

        if (fromColId === toColId) {
            moveTaskWithinColumn(fromColId, fromIndex, toIndex);
        } else {
            moveTask(String(active.id), fromColId, toColId, toIndex);
        }
    };

    const handleDragMove = (event: DragMoveEvent) => {
        const scrollContainer = document.querySelector(
            `[data-column-id="${event.over?.id}"]`
        ) as HTMLElement;

        if (scrollContainer) {
            const { bottom, top } = scrollContainer.getBoundingClientRect();
            const threshold = 50;
            const activatorEvent = event.activatorEvent as MouseEvent;

            if (event.delta.y > 0 && bottom - activatorEvent.clientY < threshold) {
                scrollContainer.scrollTop += 10;
            } else if (event.delta.y < 0 && activatorEvent.clientY - top < threshold) {
                scrollContainer.scrollTop -= 10;
            }
        }
    };

    if (!mounted) {
        return <div className="flex flex-col w-full h-full bg-gray-50" />;
    }

    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            {/* Project Details */}
            <BoardDetails
                title="Sport XI Project"
                status="In progress"
                category="event production"
                members={projectMembers}
                lastUpdated="04 April, 2022"
                onManage={() => alert("Manage clicked")}
            />

            {/* Kanban Board */}
            <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragMove={handleDragMove}>
                <div className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-thin">
                    <div className="flex flex-nowrap h-full min-h-0">
                        {filteredBoard.map((col) => (
                            <div
                                key={col.id}
                                id={col.id}
                                className="min-w-[280px] w-full md:w-[280px] lg:w-[295px] flex-shrink-0 flex flex-col border-r border-[#E6E8EC] bg-white"
                            >
                                {/* Column Header */}
                                <div className="flex items-center justify-between border-b border-[#E6E8EC] px-3 py-3">
                                    <span
                                        className={`px-6 py-1 rounded-full text-sm font-light ${col.bgColor} ${col.textColor}`}
                                    >
                                        {col.title}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src="/images/icons/plus_dark.svg"
                                            alt="Add"
                                            width={20}
                                            height={20}
                                            className="cursor-pointer"
                                        />
                                        <Image
                                            src="/images/icons/more_fill.svg"
                                            alt="More options"
                                            width={20}
                                            height={20}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                </div>

                                {/* Column Tasks */}
                                <DroppableColumn
                                    id={col.id}
                                    data-column-id={col.id}
                                    className="flex-1 flex flex-col gap-4 p-3 overflow-y-auto bg-[#F4F5F6] scrollbar-thin"
                                    style={{ maxHeight: "calc(100vh - 200px)" }}
                                >
                                    {col.tasks.map((task, index) => (
                                        <DraggableTask key={`${col.id}-${index}`} id={`${col.id}-${index}`}>
                                            <div className="cursor-grab">
                                                <TaskCard
                                                    label={task.label}
                                                    labelColor={task.labelColor}
                                                    title={task.title}
                                                    members={task.members}
                                                    dueDate={"dueDate" in task ? (task as { dueDate: string }).dueDate : "Unknown"}
                                                    priority={task.priority}
                                                    shareCount={task.shareCount ?? 0}
                                                    messageCount={task.messageCount ?? 0}
                                                    footerType={
                                                        task.footerType === "link"
                                                            ? "groupCall"
                                                            : (task.footerType ?? "none") as FooterType
                                                    }
                                                    imageUrl={
                                                        "imageUrl" in task ? task.imageUrl : undefined
                                                    }
                                                    currentStatus={col.title} // pass current column
                                                    onChangeStatus={(newStatus) => {
                                                        const toCol = board.find(c => c.title === newStatus);
                                                        if (toCol) {
                                                            moveTask(`${col.id}-${index}`, col.id, toCol.id, toCol.tasks.length);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </DraggableTask>
                                    ))}
                                </DroppableColumn>
                            </div>
                        ))}
                    </div>
                </div>
            </DndContext>
        </div>
    );
}
