// src/features/table/renderers/NumberCellView.jsx
import React from "react";

function NumberCellView({ value }) {
  const text =
    typeof value === "number" ? value.toString() : value == null ? "" : String(value);
  return <span className="cell-number">{text}</span>;
}

export default NumberCellView;
