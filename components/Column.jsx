import {
  MoreVertical,
  Archive,
  ClipboardList,
  CirclePause,
  CircleCheck,
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
        minHeight: column.cards.length === 0 ? `${headerHeight}px` : 'auto',
        height: 'fit-content', // This prevents the column from expanding to full screen height
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

      <div 
        className={`p-2 overflow-y-visible column-cards-container ${
          column.cards.length === 0 ? 'hidden' : 'block'
        }`}
      >
        <SortableContext
          id={column.id}
          items={column.cards.map((card) => card.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.cards.map((card) => (
            <Card key={card.id} card={card} columnId={column.id} />
          ))}
        </SortableContext>

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

        {isArchive && column.cards.length === 0 && (
          <div className="flex flex-col items-center justify-center text-gray-400 p-4 h-32">
            <Archive className="w-8 h-8 mb-2" />
            <p className="text-sm text-center">
              Drag cards here to archive them
            </p>
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
