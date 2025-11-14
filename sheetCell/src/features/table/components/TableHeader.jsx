// src/features/table/components/TableHeader.jsx
import React from 'react';

function TableHeader({ columns }) {
  return (
    <div className="table-header">
      <div className="table-header-row">
        {columns.map((column) => (
          <div
            key={column.id}
            className="table-header-cell"
            style={
              column.width
                ? { flexBasis: `${column.width}px` }
                : undefined
            }
          >
            <span className="table-header-title">
              {column.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableHeader;
