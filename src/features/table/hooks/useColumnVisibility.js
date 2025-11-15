import { useMemo, useState } from "react";

/**
 * Controls which table columns are visible.
 *
 * Initializes visibility from the given column order and exposes:
 *  - visibleColumnIds: Set<string>
 *  - toggleColumnVisibility(columnId)
 *
 * @param {string[]} initialColumnOrder
 * @returns {{
 *   visibleColumnIds: Set<string>,
 *   toggleColumnVisibility: (columnId: string) => void
 * }}
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

 

  return {
    visibleColumnIds: visibleIds,
    toggleColumnVisibility,
  };
}
