"use client";

import { useState, useRef, useEffect } from "react";
import AppHeader from "../components/AppHeader";
import ProjectHeader from "../components/ProjectHeader";
import NavigationTabs from "../components/NavigationTabs";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimation,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column from "../components/Column";
import Card from "../components/Card";
import { isPositionOutsideColumns } from "../utils/dragUtils";

// Helper function to get random team members
const getRandomTeamMembers = (allMembers, count) => {
  const shuffled = [...allMembers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function Board() {
  // Sample team members data
  const teamMembers = [
    {
      id: "john",
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "sarah",
      name: "Sarah Lee",
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "mike",
      name: "Mike Chen",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "lisa",
      name: "Lisa Wang",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "alex",
      name: "Alex Johnson",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "emma",
      name: "Emma Brown",
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "david",
      name: "David Smith",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "olivia",
      name: "Olivia Taylor",
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "noah",
      name: "Noah Wilson",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "ava",
      name: "Ava Martinez",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "liam",
      name: "Liam Garcia",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  // Sample data with team members assigned to cards
  const [columns, setColumns] = useState([
    {
      id: "todo",
      title: "To Do",
      cards: [
        {
          id: "card-1",
          title: "Research competitors",
          description: "Analyze top 5 competitors",
          teamMembers: getRandomTeamMembers(
            teamMembers,
            2 + Math.floor(Math.random() * 4)
          ), // 2-5 members
          dueDate: "2025-06-30",
          commentsCount: 3,
          progress: 0,
          priority: "low",
        },
        {
          id: "card-2",
          title: "Design mockups",
          description: "Create initial wireframes",
          teamMembers: getRandomTeamMembers(
            teamMembers,
            3 + Math.floor(Math.random() * 3)
          ), // 3-5 members
          dueDate: "2025-07-05",
          commentsCount: 5,
          progress: 0,
          priority: "medium",
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      cards: [
        {
          id: "card-3",
          title: "Develop landing page",
          description: "Implement responsive design",
          teamMembers: getRandomTeamMembers(
            teamMembers,
            2 + Math.floor(Math.random() * 3)
          ), // 2-4 members
          dueDate: "2025-06-28",
          commentsCount: 8,
          progress: 45,
          priority: "high",
        },
      ],
    },
    {
      id: "review",
      title: "Review",
      cards: [
        {
          id: "card-4",
          title: "Content strategy",
          description: "Finalize blog content plan",
          teamMembers: getRandomTeamMembers(
            teamMembers,
            1 + Math.floor(Math.random() * 3)
          ), // 1-3 members
          dueDate: "2025-06-25",
          commentsCount: 2,
          progress: 80,
          priority: "medium",
        },
      ],
    },
    {
      id: "completed",
      title: "Completed",
      cards: [
        {
          id: "card-5",
          title: "Project kickoff",
          description: "Initial team meeting",
          teamMembers: getRandomTeamMembers(
            teamMembers,
            4 + Math.floor(Math.random() * 3)
          ), // 4-6 members
          dueDate: "2025-06-15",
          commentsCount: 12,
          progress: 100,
          priority: "urgent",
        },
      ],
    },
  ]);

  // Track mouse position for out-of-column detection
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const hasArchiveColumn = columns.some((col) => col.id === "archived");
  const [isDraggingOutside, setIsDraggingOutside] = useState(false);

  // Enhanced sensors with modifications to prevent text selection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4, // Lower activation distance for more responsive dragging
        tolerance: 5,
        delay: 0, // No delay to avoid accidental text selection
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Active card state for drag overlay
  const [activeCard, setActiveCard] = useState(null);

  // Custom drop animation for smoother experience
  const dropAnimation = {
    ...defaultDropAnimation,
    dragSourceOpacity: 0.5,
    duration: 200,
    easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
  };

  // Get card information by ID
  const findCardById = (cardId) => {
    for (const column of columns) {
      const card = column.cards.find((card) => card.id === cardId);
      if (card) {
        return { card, column };
      }
    }
    return { card: null, column: null };
  };

  // Find the column containing a specific card
  const findColumnByCardId = (cardId) => {
    return columns.find((column) =>
      column.cards.some((card) => card.id === cardId)
    );
  };

  // Function to check if position is outside columns but inside container
  const isOutsideColumns = (position) => {
    if (!containerRef.current) return false;

    const columnElements = containerRef.current.querySelectorAll(
      "[data-droppable-id]"
    );

    // Check if position is within any column element
    for (const element of columnElements) {
      const rect = element.getBoundingClientRect();
      if (
        position.x >= rect.left &&
        position.x <= rect.right &&
        position.y >= rect.top &&
        position.y <= rect.bottom
      ) {
        return false; // Inside a column
      }
    }

    // Check if position is within the container
    const containerRect = containerRef.current.getBoundingClientRect();
    return (
      position.x >= containerRect.left &&
      position.x <= containerRect.right &&
      position.y >= containerRect.top &&
      position.y <= containerRect.bottom
    );
  };

  // Handle drag start with enhanced feedback
  function handleDragStart(event) {
    const { active } = event;
    const { card } = findCardById(active.id);
    setActiveCard(card);

    // Add a class to the body for global drag state styling and prevent text selection
    document.body.classList.add("is-dragging");

    // Explicitly clear any text selection that might have occurred
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  }

  // Track drag movement to detect when outside columns
  function handleDragMove(event) {
    const { active, over } = event;

    if (!active) return;

    // Update current mouse position
    if (event.activatorEvent && "clientX" in event.activatorEvent) {
      setMousePosition({
        x: event.activatorEvent.clientX,
        y: event.activatorEvent.clientY,
      });
    }

    // Check if dragging outside columns
    const outside = isOutsideColumns(mousePosition);
    setIsDraggingOutside(outside);

    // Create archive column if needed when dragging outside
    if (outside && !hasArchiveColumn) {
      setColumns((prev) => [
        ...prev,
        {
          id: "archived",
          title: "Archive",
          isArchive: true,
          cards: [],
        },
      ]);
    }
  }

  // Enhanced collision detection strategy
  const collisionDetectionStrategy = (args) => {
    // First, try to find intersecting rectangles (best for finding columns)
    const rectIntersectionCollisions = rectIntersection(args);
    if (rectIntersectionCollisions.length) {
      return rectIntersectionCollisions;
    }

    // If not found, use pointerWithin for better precision with pointer position
    return pointerWithin(args);
  };

  // Handle drag over with immediate visual feedback
  function handleDragOver(event) {
    const { active, over } = event;
    if (!active || !over) return;

    const activeCardId = active.id;
    const overItemId = over.id;

    // Find the active card column
    const sourceColumn = findColumnByCardId(activeCardId);
    if (!sourceColumn) return;

    // Case 1: Dragging over a column (moving to a different column)
    if (columns.some((col) => col.id === overItemId)) {
      const targetColumn = columns.find((col) => col.id === overItemId);

      // If we're not moving between columns, do nothing
      if (sourceColumn.id === targetColumn.id) return;

      setColumns((prevColumns) => {
        // Find active card
        const card = sourceColumn.cards.find((card) => card.id === activeCardId);

        // Remove card from source column
        const updatedSourceColumn = {
          ...sourceColumn,
          cards: sourceColumn.cards.filter((card) => card.id !== activeCardId),
        };

        // Add card to target column (always at the bottom)
        const updatedTargetColumn = {
          ...targetColumn,
          cards: [...targetColumn.cards, card],
        };

        // Update the columns array
        return prevColumns.map((column) => {
          if (column.id === updatedSourceColumn.id) {
            return updatedSourceColumn;
          }
          if (column.id === updatedTargetColumn.id) {
            return updatedTargetColumn;
          }
          return column;
        });
      });
    }
    // Case 2: Dragging over another card (reordering within column or moving to a specific position)
    else if (overItemId !== activeCardId) {
      const overColumn = findColumnByCardId(overItemId);

      // If not found or not the same column, return
      if (!overColumn) return;

      setColumns((prevColumns) => {
        // Get the source column's cards
        const sourceCards = [...sourceColumn.cards];

        // Get the target column's cards
        const targetCards =
          sourceColumn.id === overColumn.id
            ? sourceCards
            : [...overColumn.cards];

        // Find the card being dragged
        const activeCard = sourceCards.find((card) => card.id === activeCardId);
        if (!activeCard) return prevColumns;

        // Remove card from source cards array
        const filteredSourceCards = sourceCards.filter(
          (card) => card.id !== activeCardId
        );

        // Find the index of the target card
        const overCardIndex = targetCards.findIndex(
          (card) => card.id === overItemId
        );

        if (overCardIndex === -1) return prevColumns;

        // If same column, insert the card at the right position
        let updatedTargetCards;
        if (sourceColumn.id === overColumn.id) {
          updatedTargetCards = [...filteredSourceCards];
          updatedTargetCards.splice(overCardIndex, 0, activeCard);
        } else {
          // If different column, remove from source and add to target
          updatedTargetCards = [...targetCards];
          updatedTargetCards.splice(overCardIndex, 0, activeCard);
        }

        // Create new columns array with updated card orders
        return prevColumns.map((column) => {
          if (column.id === sourceColumn.id && column.id === overColumn.id) {
            // Same column - just update the card order
            return { ...column, cards: updatedTargetCards };
          } else if (column.id === sourceColumn.id) {
            // Source column - remove the card
            return { ...column, cards: filteredSourceCards };
          } else if (column.id === overColumn.id) {
            // Target column - add the card at the specific position
            return { ...column, cards: updatedTargetCards };
          }
          return column;
        });
      });
    }
  }

  // Modify handleDragEnd to properly handle archive functionality and preserve sorting
  function handleDragEnd(event) {
    const { active, over } = event;

    // Reset states
    setIsDraggingOutside(false);
    document.body.classList.remove("is-dragging");

    if (!active) {
      setActiveCard(null);
      return;
    }

    const { card } = findCardById(active.id);
    const sourceColumn = findColumnByCardId(active.id);

    // If not dropped over a column or dropped in empty space of container
    if ((!over || !over.id) && isOutsideColumns(mousePosition)) {
      // Move card to archive column
      if (card && sourceColumn) {
        createArchiveColumn(card);

        // Remove card from source column
        setColumns((prev) =>
          prev.map((column) =>
            column.id === sourceColumn.id
              ? {
                  ...column,
                  cards: column.cards.filter((c) => c.id !== card.id),
                }
              : column
          )
        );
      }
    } else if (over && over.id === "archived") {
      // If dropped directly on archive column
      if (card && sourceColumn && sourceColumn.id !== "archived") {
        // Remove from source and add to archive
        setColumns((prev) =>
          prev.map((column) => {
            if (column.id === sourceColumn.id) {
              return {
                ...column,
                cards: column.cards.filter((c) => c.id !== card.id),
              };
            }
            if (column.id === "archived") {
              return {
                ...column,
                cards: [...column.cards, card],
              };
            }
            return column;
          })
        );
      }
    }
    // The card reordering is now handled by handleDragOver, no need to duplicate here

    setActiveCard(null);
  }

  // Track mouse position for detecting out-of-column drops
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Filter out empty archive columns before rendering
  const visibleColumns = columns; // Show all columns, including empty archive

  // Create archive column if it doesn't exist
  const createArchiveColumn = (card) => {
    // Check if archive column already exists
    if (!hasArchiveColumn) {
      setColumns((prev) => [
        ...prev,
        {
          id: "archived",
          title: "Archive",
          isArchive: true,
          cards: [card],
        },
      ]);
    } else {
      // Add card to existing archive column
      setColumns((prev) =>
        prev.map((column) =>
          column.id === "archived"
            ? { ...column, cards: [...column.cards, card] }
            : column
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AppHeader />
      <ProjectHeader
        title="Website Design"
        budget={45000}
        teamMembers={teamMembers}
      />

      <div className="rounded-xl bg-gray-100 border border-transparent m-4">
        <NavigationTabs activeTab="Onboard" />
        <hr className="my-2 border-t border-gray-200" />
        <DndContext
          sensors={sensors}
          collisionDetection={collisionDetectionStrategy}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          measuring={{
            droppable: {
              strategy: "always",
            },
          }}
          autoScroll={{
            threshold: { x: 0.2, y: 0.2 },
          }}
        >
          <div
            ref={containerRef}
            data-board-container
            className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 min-h-[calc(100vh-20rem)]"
          >
            {visibleColumns.map((column) => (
              <Column
                key={column.id}
                column={column}
                cardCount={column.cards.length}
                isArchive={column.id === "archived"}
              />
            ))}

            {isDraggingOutside && !hasArchiveColumn && (
              <div className="archive-column-placeholder w-full flex-shrink-0 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center p-4 animate-pulse">
                <div className="text-gray-400 flex flex-col items-center">
                  <span className="text-sm">Drop here to archive</span>
                </div>
              </div>
            )}
          </div>
          <DragOverlay dropAnimation={dropAnimation}>
            {activeCard ? (
              <div className="drag-overlay">
                <Card card={activeCard} isOverlay />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
