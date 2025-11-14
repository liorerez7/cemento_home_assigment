// src/features/table/renderers/SelectCellView.jsx
import React from "react";

/*
  HIGH LEVEL (future design):

  - This component should eventually map option keys to human-friendly labels.
  - The mapping can come from:
      - column.options (if defined on the schema)
      - a central registry in constants
      - or a per-column metadata configuration
*/

function SelectCellView({ value }) {
  const text = value == null ? "" : String(value);

  return (
    <span className="cell-select" title={text}>
      {text}
    </span>
  );
}

export default SelectCellView;
