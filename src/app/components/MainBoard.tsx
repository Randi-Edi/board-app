import Image from "next/image";
import BoardDetails from "./BoardDetails";
import { projectMembers } from "../lib/constants";

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
        </div>
    )
}

export default MainBoard
