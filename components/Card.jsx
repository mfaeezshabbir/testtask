"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { preventTextSelection } from "../utils/dragUtils";
import { CornerDownRight, Flag } from "lucide-react";
import CardFooter from "./CardFooter";

export default function Card({ card, columnId, isOverlay = false }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: "card",
      card,
      columnId,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : "auto",
    WebkitUserSelect: "none",
    userSelect: "none",
  };

  const cardClasses = `
    bg-white p-4 rounded-lg shadow mb-2 
    ${isDragging ? "shadow-md ring-2 ring-blue-300 opacity-50" : "shadow"}
    ${isOverlay ? "shadow-lg ring-2 ring-blue-400 scale-105" : ""}
    hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing
    select-none touch-manipulation
  `;

  const enhancedListeners = {
    ...listeners,
    onMouseDown: (e) => {
      preventTextSelection(e);
      listeners.onMouseDown(e);
    },
    onTouchStart: (e) => {
      preventTextSelection(e);
      listeners.onTouchStart?.(e);
    },
  };

  // Show only 2 team members and display "+N" for additional members
  const visibleMembers = card.teamMembers ? card.teamMembers.slice(0, 2) : [];
  const remainingMembersCount = card.teamMembers
    ? Math.max(0, card.teamMembers.length - 2)
    : 0;

  // Get priority badge styling based on priority level
  const getPriorityBadgeStyle = () => {
    if (!card.priority) return null;

    switch (card.priority.toLowerCase()) {
      case "low":
        return {
          bg: "bg-blue-100",
          text: "text-blue-600",
          label: "Low",
        };
      case "medium":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-600",
          label: "Medium",
        };
      case "high":
        return {
          bg: "bg-orange-100",
          text: "text-orange-600",
          label: "High",
        };
      case "urgent":
        return {
          bg: "bg-red-100",
          text: "text-red-600",
          label: "Urgent",
        };
      default:
        return null;
    }
  };

  const priorityStyle = getPriorityBadgeStyle();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cardClasses}
      {...attributes}
      {...enhancedListeners}
      data-card-id={card.id}
    >
      {/* Priority Badge */}
      {priorityStyle && (
        <div
          className={`text-xs font-bold ${priorityStyle.bg} ${priorityStyle.text} px-2 py-1 rounded-lg inline-flex items-center gap-1 mb-2`}
        >
          <Flag size={12} className={priorityStyle.text} />
          {priorityStyle.label}
        </div>
      )}
      {/* Card Title */}
      <div className="text-sm font-medium mb-2 select-none">{card.title}</div>
      <div className="text-xs text-gray-600 mb-3 select-none flex items-center gap-2">
        <CornerDownRight size={14} className="text-gray-400" />
        {card.description}
      </div>

      <hr className="my-2 border-t border-gray-200" />

      {/* Footer Section */}
      <CardFooter
        teamMembers={card.teamMembers || []}
        commentsCount={card.commentsCount || 0}
        dueDate={card.dueDate}
        progress={card.progress || 0}
      />
    </div>
  );
}
