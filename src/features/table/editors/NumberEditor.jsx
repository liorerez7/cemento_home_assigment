import React, { useEffect, useRef } from "react";

function NumberEditor({ value, onChange, onCommit, onCancel, autoFocus }) {
  const ref = useRef(null);

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  }, [autoFocus]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onCommit();
    if (e.key === "Escape") onCancel();
  };

  return (
    <input
      ref={ref}
      type="number"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
      onBlur={onCommit}
      onKeyDown={handleKeyDown}
      className="cell-editor cell-editor-number"
    />
  );
}

export default NumberEditor;
