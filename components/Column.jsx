import {
  MoreVertical,
  Archive,
  ClipboardList,
  CirclePause,
  CircleCheck,
  Plus,
} from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Card from "./Card";
import { useEffect, useState, useRef } from "react";

export default function Column({ column, cardCount, isArchive = false }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: "column", column },
  });

  const columnRef = useRef(null);
  const headerHeight = 68; // Height of the header (p-3 m-2 + content)

  const columnStyles = {
    todo: {
      icon: <ClipboardList className="w-4 h-4 mr-2 text-[#5D5D5D]" />,
      textColor: "text-[#5D5D5D]",
      bgColor: "bg-[#5D5D5D1A]",
    },
    "in-progress": {
      icon: (
        <img src="/inprogress.svg" alt="In Progress" className="w-4 h-4 mr-2" />
      ),
      textColor: "text-[#3A98EB]",
      bgColor: "bg-[#3A98EB1A]",
    },
    review: {
      icon: <CirclePause className="w-4 h-4 mr-2 text-[#F1A02E]" />,
      textColor: "text-[#F1A02E]",
      bgColor: "bg-[#F1A02E1A]",
    },
    completed: {
      icon: <CircleCheck className="w-4 h-4 mr-2 text-[#20BB70]" />,
      textColor: "text-[#20BB70]",
      bgColor: "bg-[#20BB701A]",
    },
    archived: {
      icon: <Archive className="w-4 h-4 mr-2 text-[#5D5D5D]" />,
      textColor: "text-[#5D5D5D]",
      bgColor: "bg-[#5D5D5D1A]",
    },
  };

  const columnStyle = columnStyles[column.id] || {};

  // Empty state messages for different column types
  const getEmptyStateMessage = () => {
    if (isArchive) return "Drag cards here to archive them";
    
    switch (column.id) {
      case "todo": 
        return "Add tasks to get started";
      case "in-progress":
        return "Move cards here to start working";
      case "review":
        return "Items awaiting review";
      case "completed":
        return "Completed tasks will appear here";
      default:
        return "Drag and drop cards here";
    }
  };

  // Icons for empty states
  const getEmptyStateIcon = () => {
    if (isArchive) return <Archive className="w-6 h-6 mb-2" />;
    
    switch (column.id) {
      case "todo": 
        return <ClipboardList className="w-6 h-6 mb-2 text-gray-400" />;
      case "in-progress":
        return <img src="/inprogress.svg" alt="In Progress" className="w-6 h-6 mb-2" />;
      case "review":
        return <CirclePause className="w-6 h-6 mb-2 text-gray-400" />;
      case "completed":
        return <CircleCheck className="w-6 h-6 mb-2 text-gray-400" />;
      default:
        return <Plus className="w-6 h-6 mb-2 text-gray-400" />;
    }
  };

  return (
    <div
      ref={(node) => {
        // Combine both refs
        setNodeRef(node);
        columnRef.current = node;
      }}
      data-droppable-id={column.id}
      className={`w-full flex-shrink-0 rounded-lg transition-all duration-300 ease-in-out relative column-container ${
        isOver
          ? "bg-blue-50 ring-2 ring-blue-200"
          : isArchive
          ? "bg-gray-100"
          : "bg-gray-50"
      } ${isArchive ? "border border-dashed border-gray-300" : ""} ${
        isArchive && column.cards.length === 0 ? "archive-column-new" : ""
      }`}
      style={{
        minHeight: '150px', // Always maintain a minimum height for interaction
        height: 'fit-content', 
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className={`p-3 m-2 font-medium flex items-center justify-between ${columnStyle.bgColor} rounded-lg`}
      >
        <div className="flex items-center">
          {columnStyle.icon}
          <span className={columnStyle.textColor}>{column.title}</span>
          {/* <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
            {column.cards.length}
          </span> */}
        </div>
      </div>

      {/* Card container */}
      <div className="p-2 overflow-y-visible column-cards-container flex-grow">
        {column.cards.length > 0 ? (
          <SortableContext
            id={column.id}
            items={column.cards.map((card) => card.id)}
            strategy={verticalListSortingStrategy}
          >
            {column.cards.map((card) => (
              <Card key={card.id} card={card} columnId={column.id} />
            ))}
          </SortableContext>
        ) : !isOver && (
          <div className={`flex flex-col items-center justify-center text-gray-400 p-4 h-32 
            ${isArchive ? "bg-gray-50" : "bg-gray-50"} 
            border-2 border-dashed border-gray-200 rounded-lg`}>
            {getEmptyStateIcon()}
            <p className="text-xs text-center">
              {getEmptyStateMessage()}
            </p>
          </div>
        )}

        {isOver && (
          <div
            className={`border-2 border-dashed ${
              isArchive
                ? "border-orange-300 bg-orange-50"
                : "border-blue-300 bg-blue-50"
            } rounded-lg p-3 mb-2 transition-all animate-pulse`}
          >
            <div
              className={`h-8 flex items-center justify-center ${
                isArchive ? "text-orange-500" : "text-blue-400"
              } text-sm`}
            >
              {isArchive ? "Archive here" : "Drop here"}
            </div>
          </div>
        )}
      </div>

      {isOver && (
        <div
          className={`absolute inset-0 ${
            isArchive ? "bg-orange-100" : "bg-blue-100"
          } bg-opacity-10 pointer-events-none rounded-lg`}
        />
      )}
    </div>
  );
}
