import Image from "next/image";
import BoardDetails from "./BoardDetails";
import { projectMembers } from "../lib/constants";
import TaskCard from "./TaskCard";
import { mockBoardData } from "../lib/mockData";

const MainBoard = () => {
    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            {/* Project Description */}
            <BoardDetails
                title="Sport XI Project"
                status="In progress"
                category="event production"
                members={projectMembers}
                lastUpdated="04 April, 2022"

            />
            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden">
                <div className="flex flex-nowrap h-full">
                    {mockBoardData.map((col) => (
                        <div
                            key={col.id}
                            id={col.id}
                            className="flex-1 min-w-[260px] flex-shrink-0 flex flex-col border-r border-[#E6E8EC] bg-white"
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
                            <div
                                id={col.id}
                                className="flex-1 flex flex-col gap-4 p-3 overflow-y-auto bg-[#F4F5F6]"
                            >
                                {col.tasks.map((task, index) => (
                                    <div key={`${col.id}-${index}`} id={`${col.id}-${index}`}>
                                        <div className="cursor-grab">
                                            <TaskCard
                                                label={task.label}
                                                labelColor={task.labelColor}
                                                title={task.title}
                                                members={task.members}
                                                dueDate={
                                                    "dueDate" in task ? (task as any).dueDate : "Unknown"
                                                }
                                                priority={task.priority}
                                                shareCount={task.shareCount ?? 0}
                                                messageCount={task.messageCount ?? 0}
                                                footerType={
                                                    task.footerType === "link"
                                                        ? "groupCall"
                                                        : (task.footerType as any)
                                                }
                                                imageUrl={
                                                    "imageUrl" in task ? task.imageUrl : undefined
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default MainBoard
