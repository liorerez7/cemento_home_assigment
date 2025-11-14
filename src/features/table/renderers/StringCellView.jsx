// src/features/table/renderers/StringCellView.jsx
import React from "react";

function StringCellView({ value }) {
  const text = value == null ? "" : String(value);
  return (
    <span className="cell-string" title={text}>
      {text}
    </span>
  );
}

export default StringCellView;
