// src/features/table/hooks/useColumnVisibility.js
import { useMemo, useState } from "react";

/*
  HIGH LEVEL (future design):

  This hook should:
    - Accept initial column order (array of columnIds).
    - Maintain a Set<string> of visible columns.
    - Expose:
        visibleColumnIds: Set<string>
        toggleColumnVisibility(columnId): void
    - Optionally:
        - Load initial visibility preferences from localStorage.
        - Persist changes to localStorage using a stable key.

  CURRENT IMPLEMENTATION:

    - Initializes visibility with all columnIds visible.
    - Provides toggleColumnVisibility that adds/removes ids from the Set.
    - Does not persist to localStorage yet.
*/

export default function useColumnVisibility(initialColumnOrder) {
  const [visibleColumnIds, setVisibleColumnIds] = useState(() => {
    const set = new Set();
    if (Array.isArray(initialColumnOrder)) {
      initialColumnOrder.forEach((id) => {
        if (id) set.add(id);
      });
    }
    return set;
  });

  const toggleColumnVisibility = (columnId) => {
    if (!columnId) return;

    setVisibleColumnIds((prev) => {
      const next = new Set(prev);
      if (next.has(columnId)) {
        next.delete(columnId);
      } else {
        next.add(columnId);
      }
      return next;
    });
  };

  const visibleIds = useMemo(
    () => visibleColumnIds,
    [visibleColumnIds]
  );

  return {
    visibleColumnIds: visibleIds,
    toggleColumnVisibility,
  };
}
