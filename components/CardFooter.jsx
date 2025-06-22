import React from "react";
import { CalendarClock, MessageCircleMore } from "lucide-react";
import Assignee from "./Assignee";
import CircleProgressBar from "./CircleProgressBar";

const CardFooter = ({
  teamMembers = [],
  commentsCount = 0,
  dueDate,
  progress = 0,
}) => {
  return (
    <div className="flex items-center justify-between space-x-4">
      {/* Team Members */}
      <Assignee teamMembers={teamMembers} />

      <div className="flex items-center gap-2 text-gray-300">
        {/* Comments */}
        <div className="flex items-center text-xs text-gray-500">
          <MessageCircleMore className="w-4 h-4 text-gray-400 mr-1" />
          <span>{commentsCount}</span>
        </div>
        |{/* Due Date */}
        <div className="flex items-center text-xs text-gray-500">
          <CalendarClock className="w-4 h-4 text-gray-400 mr-1" />
          <span>
            {dueDate &&
              new Date(dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
          </span>
        </div>
        |{/* Progress */}
        <div className="flex items-center gap-1">
          <CircleProgressBar
            progress={progress}
            size={16}
            strokeWidth={2}
            className="mr-1"
          />
          <span className="text-xs text-gray-500">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default CardFooter;
