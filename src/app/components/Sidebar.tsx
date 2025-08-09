"use client";
import { useState } from "react";
import Image from "next/image";
import { navItems, submenuItems } from "../lib/constants";

export default function Sidebar({
    open,
    onClose,
}: {
    open?: boolean;
    onClose?: () => void;
}) {
    const [isBoardsOpen, setIsBoardsOpen] = useState(true);

    return (
        <>
            {/* Dark overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            {/* Sidebar container */}
            <aside
                className={`
          w-[288px] min-w-[288px] bg-sidebar border-r border-[#E6E8EC]
          flex flex-col h-full z-50
          transform transition-transform duration-300
          fixed top-0 left-0
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0
        `}
            >
                {/* Scrollable content */}
                <div className="flex flex-col h-full overflow-y-auto">
                    {/* Close button for mobile */}
                    <div className="lg:hidden flex justify-end p-4">
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                            <Image
                                src="/images/icons/close.svg"
                                alt="Close"
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>

                    {/* Workspace Section */}
                    <div className="px-6 pt-2">
                        <div className="flex items-center justify-between w-full border border-[#E6E8EC] rounded-md px-4 py-3 cursor-pointer hover:bg-gray-50 transition">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-sidebar-accent rounded-full flex items-center justify-center">
                                    <Image
                                        src="/images/icons/user_profile.svg"
                                        alt="Workspace User"
                                        width={44}
                                        height={44}
                                        style={{ height: "auto" }}
                                    />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-sidebar-foreground">
                                        Root folder
                                    </div>
                                    <div className="text-xs text-sidebar-foreground/70 opacity-50 mt-[2px]">
                                        Workspace
                                    </div>
                                </div>
                            </div>
                            <Image
                                src="/images/icons/arrow_down.svg"
                                alt="Expand"
                                width={24}
                                height={24}
                            />
                        </div>
                    </div>

                    {/* Dashboard Button */}
                    <div className="px-6 mt-6">
                        <button className="flex items-center gap-3 px-6 text-sm font-medium w-full">
                            <Image
                                src="/images/icons/grid.svg"
                                alt="Dashboard"
                                width={24}
                                height={24}
                            />
                            Dashboard
                        </button>
                    </div>

                    {/* Boards Section */}
                    <div className="px-6 pt-6">
                        <div
                            className="flex items-center justify-between w-full border border-[#E6E8EC] rounded-md px-4 cursor-pointer hover:bg-gray-50 transition"
                            onClick={() => setIsBoardsOpen(!isBoardsOpen)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-sidebar-accent rounded-full flex items-center justify-center">
                                    <Image
                                        src="/images/icons/folder.svg"
                                        alt="Boards"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-sm font-medium text-primary">Boards</div>
                                </div>
                            </div>
                            <Image
                                src="/images/icons/arrow_up.svg"
                                alt="Expand"
                                width={24}
                                height={24}
                                className={`transition-transform duration-200 ${isBoardsOpen ? "" : "rotate-180"
                                    }`}
                            />
                        </div>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${isBoardsOpen ? "max-h-60 mt-2" : "max-h-0"
                                }`}
                        >
                            <ul className="border border-[#E6E8EC] rounded-lg overflow-hidden">
                                {submenuItems.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className={`m-1 rounded-sm flex items-center gap-2 px-3 py-1 cursor-pointer text-sm ${item.active
                                            ? "bg-gray-100 font-medium text-primary"
                                            : "hover:bg-gray-100 text-[#B1B5C3]"
                                            }`}
                                    >
                                        <Image
                                            src={`/${item.active
                                                ? "images/icons/arrow_right_active.svg"
                                                : "images/icons/arrow_right.svg"
                                                }`}
                                            alt="Go"
                                            width={24}
                                            height={24}
                                        />
                                        <span>{item.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 mt-6">
                        {navItems.map((item, index) => (
                            <div key={index} className="pl-6 pr-3 py-4 hover:bg-gray-100">
                                <button
                                    className={`cursor-pointer flex items-center ${item.badge ? "justify-between" : "gap-3"
                                        } px-6 text-sm font-medium w-full`}
                                    style={{ color: "#777E90" }}
                                >
                                    <span className="flex items-center gap-3">
                                        <Image
                                            src={item.icon}
                                            alt={item.label}
                                            width={24}
                                            height={24}
                                        />
                                        {item.label}
                                    </span>
                                    {item.badge !== undefined && (
                                        <span
                                            className="text-white text-xs px-2 py-0.5 rounded-full"
                                            style={{ backgroundColor: item.badgeColor }}
                                        >
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            </div>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="border-t border-[#E6E8EC] p-4">
                        <button className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 text-sm font-medium text-[#777E90] w-full cursor-pointer">
                            <Image
                                src="/images/icons/info_circle.svg"
                                alt="Info"
                                width={24}
                                height={24}
                            />
                            Support
                        </button>
                        <button className="mt-2 bg-[#353945] flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-600 text-sm font-medium text-white w-full cursor-pointer">
                            <Image
                                src="/images/icons/sign_out.svg"
                                alt="Logout"
                                width={24}
                                height={24}
                            />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
