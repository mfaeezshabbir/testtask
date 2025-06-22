/**
 * Utility functions for drag and drop operations
 */

// Prevents text selection when initiating a drag
export function preventTextSelection(e) {
  // Prevent the default browser behavior that might cause text selection
  if (e.target && 
      e.target.tagName !== 'INPUT' && 
      e.target.tagName !== 'TEXTAREA' &&
      e.target.isContentEditable !== true) {
    e.preventDefault();
  }
}

// Adds global styles to disable text selection during dragging
export function disableGlobalTextSelection() {
  const style = document.createElement('style');
  style.id = 'disable-text-selection';
  style.innerHTML = `
    * {
      -webkit-user-select: none !important;
      user-select: none !important;
    }
  `;
  document.head.appendChild(style);
}

// Removes global styles that disable text selection
export function enableGlobalTextSelection() {
  const style = document.getElementById('disable-text-selection');
  if (style) {
    style.remove();
  }
}

// Check if a mouse position is outside any column elements
export function isPositionOutsideColumns(position, containerElement) {
  if (!containerElement) return false;
  
  const columnElements = containerElement.querySelectorAll('[data-droppable-id]');
  
  // Check if mouse position is within any column element
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
  
  // Check if mouse position is within the container itself
  const containerRect = containerElement.getBoundingClientRect();
  return (
    position.x >= containerRect.left &&
    position.x <= containerRect.right &&
    position.y >= containerRect.top &&
    position.y <= containerRect.bottom
  );
}
