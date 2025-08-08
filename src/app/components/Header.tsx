import Image from "next/image";

export default function Header() {
    return (
        <header className="bg-header h-20 flex items-center justify-between px-4 md:px-6 border-b border-[#E6E8EC]">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                <Image
                    src="/images/icons/logo.svg"
                    alt="Logo"
                    width={98}
                    height={24}

                />
                {/* Create New Board Button */}
            </div>

            {/* Right Section */}
            <div className="flex items-center">
                {/* Button & Search - gap 24px */}
                <div className="flex items-center gap-[24px]">
                    {/* Create New Board */}
                    <button className="bg-primary text-white w-[170px] h-12 rounded-lg text-[12px] font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer">
                        Create new board
                        <Image
                            src="/images/icons/plus.svg"
                            alt="Plus"
                            width={24}
                            height={24}
                        />
                    </button>

                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="bg-secondary w-[240px] h-12 pl-10 pr-4 rounded-lg text-[12px] focus:outline-none"
                        />
                        <Image
                            src="/images/icons/search.svg"
                            alt="Search"
                            width={18}
                            height={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2"
                        />
                    </div>
                </div>

                {/* Gap between Search and Icons - 48px */}
                <div className="flex items-center ml-[48px]">
                    <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                        <Image
                            src="/images/icons/settings.svg"
                            alt="Settings"
                            width={24}
                            height={24}
                            className="rounded-full object-cover"
                        />
                    </button>

                    <button className="p-2 hover:bg-gray-100 rounded-full relative cursor-pointer">
                        <Image
                            src="/images/icons/bell.svg"
                            alt="Notifications"
                            width={24}
                            height={24}
                            className="rounded-full object-cover"
                        />
                    </button>

                    <button className="p-2 hover:bg-gray-100 rounded-full relative cursor-pointer">
                        <Image
                            src="/images/icons/user_profile.svg"
                            alt="User Profile"
                            width={30}
                            height={30}
                            className="rounded-full object-cover"
                        />
                    </button>
                </div>
            </div>

        </header>
    );
}