import Image from "next/image";
import React from "react";

interface BoardDetailsProps {
    title: string;
    status: string;
    statusColor?: string;
    category: string;
    members: string[];
    lastUpdated: string;
    onManage?: () => void;
}

const BoardDetails: React.FC<BoardDetailsProps> = ({
    title,
    status,
    statusColor = "#FFA800",
    category,
    members,
    lastUpdated,
    onManage,
}) => {
    const visibleMembers = members.slice(0, 3);
    const remainingCount = members.length - visibleMembers.length;

    return (
        <div className="pt-6 px-6 border-b border-gray-200 bg-white shrink-0">
            {/* Title & Status */}
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                <span
                    className="px-2 py-0.5 text-[10px] rounded-md"
                    style={{ backgroundColor: statusColor }}
                >
                    {status}
                </span>
            </div>

            {/* Category */}
            <p className="text-[#B1B5C3] mt-1">{category}</p>

            {/* Assigned Members */}
            <div className="flex items-center mt-4">
                <p className="text-sm text-[#B1B5C3] mr-4">assigned</p>
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                        {visibleMembers.map((img, idx) => (
                            <Image
                                key={idx}
                                src={img}
                                alt={`Member ${idx + 1}`}
                                width={32}
                                height={32}
                                className="rounded-full border-2 border-white"
                            />
                        ))}

                        {remainingCount > 0 && (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-600 border-2 border-white">
                                +{remainingCount}
                            </div>
                        )}
                    </div>

                    {/* Manage Button */}
                    <button
                        onClick={onManage}
                        className="flex items-center gap-2 border border-[#E6E8EC] ml-3 px-3 py-1 rounded-4xl text-[#B1B5C3] text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                        Manage
                        <Image
                            src="/images/icons/pencil.svg"
                            alt="Edit"
                            width={16}
                            height={16}
                        />
                    </button>
                </div>
            </div>
            <p className="border-t mt-6 border-gray-200 bg-background px-1 py-4 text-sm text-[#B1B5C3]">Last updated on: {lastUpdated}</p>

        </div>
    );
};

export default BoardDetails;