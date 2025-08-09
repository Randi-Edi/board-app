import Image from "next/image";

export default function Header({
    search,
    setSearch,
    onMenuClick
}: {
    search: string;
    setSearch: (s: string) => void;
    onMenuClick?: () => void;
}) {
    return (
        <header className="bg-header h-20 flex items-center justify-between px-4 md:px-6 border-b border-[#E6E8EC]">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                {/* Menu icon for mobile */}
                <button
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
                    onClick={onMenuClick}
                >
                    <Image
                        src="/images/icons/menu.svg"
                        alt="Menu"
                        width={24}
                        height={24}
                    />
                </button>

                {/* Logo - Shrinks on small screens */}
                <Image
                    src="/images/icons/logo.svg"
                    alt="Logo"
                    width={98}
                    height={24}
                    priority
                    className="hidden sm:block" // Full logo for larger screens
                />
                <Image
                    src="/images/icons/logo-small.svg"
                    alt="Logo Small"
                    width={32}
                    height={32}
                    priority
                    className="sm:hidden" // Small logo for mobile
                />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-[12px]">
                    {/* Create board button */}
                    <button className="bg-primary text-white rounded-lg text-[12px] font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer w-[170px] h-12 sm:flex hidden">
                        Create new board
                        <Image
                            src="/images/icons/plus.svg"
                            alt="Plus"
                            width={20}
                            height={20}
                        />
                    </button>
                    {/* Mobile only: small + icon */}
                    <button className="bg-primary text-white w-10 h-10 rounded-lg hover:opacity-90 transition flex items-center justify-center sm:hidden">
                        <Image
                            src="/images/icons/plus.svg"
                            alt="Plus"
                            width={20}
                            height={20}
                        />
                    </button>

                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-secondary h-12 pl-10 pr-4 rounded-lg text-[12px] focus:outline-none w-[240px] md:w-[200px] sm:w-[140px]"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
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

                {/* Icons */}
                <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Image
                            src="/images/icons/settings.svg"
                            alt="Settings"
                            width={24}
                            height={24}
                        />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full relative">
                        <Image
                            src="/images/icons/bell.svg"
                            alt="Notifications"
                            width={24}
                            height={24}
                        />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full relative">
                        <Image
                            src="/images/icons/user_profile.svg"
                            alt="User Profile"
                            width={30}
                            height={30}
                        />
                    </button>
                </div>
            </div>
        </header>
    );
}