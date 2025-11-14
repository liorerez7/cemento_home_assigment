import React, { useEffect, useRef } from "react";

function BooleanEditor({ value, onChange, onCommit, onCancel, autoFocus }) {
  const ref = useRef(null);

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
      value={value ? "true" : "false"}
      onChange={(e) => onChange(e.target.value === "true")}
      onBlur={onCommit}
      onKeyDown={handleKeyDown}
      className="cell-editor cell-editor-boolean"
    >
      <option value="true">True</option>
      <option value="false">False</option>
    </select>
  );
}

export default BooleanEditor;
