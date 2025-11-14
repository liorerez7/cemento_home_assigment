import React, { useEffect, useRef } from "react";

const DEFAULT_OPTIONS = ["admin", "manager", "user", "guest"];

function SelectEditor({ value, onChange, onCommit, onCancel, autoFocus, column }) {
  const ref = useRef(null);
  const options = column?.options ?? DEFAULT_OPTIONS;

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus();
    }
  }, [autoFocus]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onCommit();
    if (e.key === "Escape") onCancel();
  };

  return (
    <select
      ref={ref}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onCommit}
      onKeyDown={handleKeyDown}
      className="cell-editor cell-editor-select"
    >
      {options.map(o => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

export default SelectEditor;
