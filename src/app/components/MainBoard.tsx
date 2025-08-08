import Image from "next/image";

const MainBoard = () => {
    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            {/* Project Description */}
            <div className="p-6 border-b border-gray-200 bg-white shrink-0">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Sport XI Project
                    </h1>
                    <span className="px-2 py-0.5 text-[10px] rounded-md bg-[#FFA800] text-[#B1B5C3">
                        In progress
                    </span>
                </div>
                <p className="text-[#B1B5C3] mt-1">event production</p>

                <div className="flex items-center mt-4">
                    <p className="text-sm text-[#B1B5C3] mr-4">
                        assigned
                    </p>
                    <div className="flex items-center gap-2">
                        {/* Avatars */}
                        <div className="flex -space-x-2">
                            <Image
                                src="/images/icons/user_profile.svg"
                                alt="Member 1"
                                width={32}
                                height={32}
                                className="rounded-full border-2 border-white"
                            />
                            <Image
                                src="/images/icons/user_profile.svg"
                                alt="Member 2"
                                width={32}
                                height={32}
                                className="rounded-full border-2 border-white"
                            />
                            <Image
                                src="/images/icons/user_profile.svg"
                                alt="Member 2"
                                width={32}
                                height={32}
                                className="rounded-full border-2 border-white"
                            />
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-600 border-2 border-white">
                                +2
                            </div>
                        </div>
                        <button className="flex items-center gap-2 border border-[#E6E8EC] ml-3 px-3 py-1.5 rounded-4xl text-gray-700 text-sm hover:bg-gray-50">
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
                <p className="py-4 text-sm text-gray-400">
                    Last updated on: 04 April, 2022
                </p>
            </div>
        </div>
    )
}

export default MainBoard
