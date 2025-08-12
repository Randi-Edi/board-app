"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
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
    currentStatus,
    onChangeStatus,
}: TaskCardProps) => {
    const maxVisible = 3;
    const visibleMembers = members.slice(0, maxVisible);
    const remainingCount = members.length - maxVisible;

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const statuses = ["To Do", "In Progress", "Approved", "Reject"];
    const filteredStatuses = statuses.filter(s => s !== currentStatus);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


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
        <div className="task-card bg-white border border-gray-200 p-4 flex-shrink-0 flex flex-col justify-between rounded-xl min-w-[260px]">
            {/* Top Section */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <span
                            className="w-2 h-2"
                            style={{ backgroundColor: labelColor }}
                        />
                        <span className="text-[#B1B5C3] text-xs">{label}</span>
                    </div>
                    {/* Three dots + Dropdown */}
                    <div className="relative" ref={menuRef}>
                        <Image
                            src="/images/icons/more_fill.svg"
                            alt="More options"
                            width={16}
                            height={16}
                            className="cursor-pointer"
                            onClick={() => setMenuOpen(prev => !prev)}
                        />

                        {/* Animated dropdown */}
                        <div
                            className={`absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-10
                            transform transition-all duration-200 origin-top-right
                            ${menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                        `}
                        >
                            {filteredStatuses.map(status => (
                                <button
                                    key={status}
                                    onClick={() => {
                                        onChangeStatus(status);
                                        setMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="font-medium text-gray-800">{title}</p>

                {/* Members & Priority */}
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

                {/* Optional Image */}
                {imageUrl && (
                    <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden bg-gray-800 mt-3">
                        <Image
                            src={imageUrl}
                            alt="Task"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}
            </div>

            {/* Footer Section */}
            <div className="border-t border-gray-200 mt-3 pt-2 flex items-center justify-between gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Image
                            src="/images/icons/link.svg"
                            alt="Share"
                            width={14}
                            height={14}
                        />
                        <span>{shareCount}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Image
                            src="/images/icons/message.svg"
                            alt="Messages"
                            width={14}
                            height={14}
                        />
                        <span>{messageCount}</span>
                    </div>
                </div>

                {footerType !== "none" && (
                    <div className="flex items-center gap-1">
                        <Image
                            src={footerMap[footerType].icon}
                            alt={footerMap[footerType].text}
                            width={14}
                            height={14}
                        />
                        <span
                            className={
                                footerType === "reports"
                                    ? "text-red-500"
                                    : ["stream", "groupCall"].includes(footerType)
                                        ? "text-blue-500"
                                        : ""
                            }
                        >
                            {footerMap[footerType].text}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
