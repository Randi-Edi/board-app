import Image from "next/image";
import React from "react";
import { TaskCardProps } from "../lib/interfaces/taskcard";
import { FooterItem } from "../lib/interfaces/footerItem";



const TaskCard = ({
    label,
    labelColor,
    title,
    members,
    dueDate,
    priority,
    shareCount,
    messageCount,
    footerType,
    imageUrl,
}: TaskCardProps) => {
    const maxVisible = 3;
    const visibleMembers = members.slice(0, maxVisible);
    const remainingCount = members.length - maxVisible;

    const footerMap: Record<string, FooterItem> = {
        due: { icon: "/images/icons/calendar.svg", text: `Due: ${dueDate || ""}` },
        reports: { icon: "/images/icons/info_circle_warning.svg", text: "Reports" },
        stream: { icon: "/images/icons/bell_active.svg", text: "Stream" },
        groupCall: { icon: "/images/icons/bell_active.svg", text: "Group Call" },
        link: { icon: "/images/icons/link.svg", text: "Link" },
        counts: { icon: "/images/icons/info_circle.svg", text: "Counts" },
        image: { icon: "/images/icons/image.svg", text: "Image" },
        none: { icon: "", text: "" },
    };

    return (
        <div
            className="bg-white border border-gray-200 p-4 flex-shrink-0 flex flex-col justify-between"
            style={{
                minWidth: "260px",
                borderRadius: "12px",
            }}
        >
            {/* Top Section */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: labelColor }}
                        />
                        <span className="text-[#B1B5C3] text-xs">{label}</span>
                    </div>

                    <Image
                        src="/images/icons/more_fill.svg"
                        alt="More options"
                        width={16}
                        height={16}
                        className="cursor-pointer"
                    />
                </div>

                <p className="font-medium text-gray-800">{title}</p>

                <div className="flex items-center gap-3 mt-3">
                    <div className="flex -space-x-2">
                        {visibleMembers.map((img, idx) => (
                            <Image
                                key={idx}
                                src={img}
                                alt={`Member ${idx + 1}`}
                                width={20}
                                height={20}
                                className="rounded-full border-2 border-white"
                            />
                        ))}

                        {remainingCount > 0 && (
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 border-2 border-white">
                                +{remainingCount}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-md px-1 py-0.5">
                        <Image
                            src="/images/icons/flash.svg"
                            alt="Priority Flag"
                            width={12}
                            height={12}
                        />
                        <span>{priority}</span>
                    </div>
                </div>

                {/* Optional Image / Placeholder */}
                <div className="mt-3">
                    {imageUrl && (
                        <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden bg-gray-800">
                            <Image
                                src="/images/image_placeholder.svg"
                                alt="Upload"
                                fill
                                className="object-cover"
                            />
                        </div>

                    )}
                </div>
            </div>

            {/* Footer Section */}
            <div className="border-t border-gray-200 mt-3 pt-2 flex items-center justify-start gap-4 text-xs text-gray-500">
                {/* Share count */}
                <div className="flex items-center gap-1">
                    <Image
                        src="/images/icons/link.svg"
                        alt="Share"
                        width={14}
                        height={14}
                    />
                    <span>{shareCount}</span>
                </div>

                {/* Message count */}
                <div className="flex items-center gap-1">
                    <Image
                        src="/images/icons/message.svg"
                        alt="Messages"
                        width={14}
                        height={14}
                    />
                    <span>{messageCount}</span>
                </div>

                {/* Only show footer type if it's not "none" */}
                {footerType !== "none" && (
                    <div className="flex items-center gap-1">
                        <Image
                            src={footerMap[footerType].icon}
                            alt={footerMap[footerType].text}
                            width={14}
                            height={14}
                        />
                        <span className={`${footerType == "reports" ? "text-red-500" : footerType == "stream" ? "text-blue-500" : ''}`}>{footerMap[footerType].text}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
