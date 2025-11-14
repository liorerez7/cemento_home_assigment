/**
 * Renders the table header row according to the visible columns.
 *
 * @param {{ columns: any[] }} props
 */

function TableHeader({ columns }) {
  return (
    <div className="table-header">
      <div className="table-header-row">
        {columns.map((column) => (
          <div
            key={column.id}
            className="table-header-cell"
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
