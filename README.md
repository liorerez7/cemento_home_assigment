# Generic React Table

A lightweight, fully custom React table implementation. This project showcases clean component architecture, virtualization, inline editing, and a production-ready Docker + Nginx setup.

## Project Overview

This application is a client-side React SPA that renders a generic, schema-driven data table with the following capabilities:

- **Inline cell editing** - Edit cells directly in the table
- **Column visibility toggling** - Show/hide columns dynamically
- **Virtualized row rendering** - Smooth performance for large datasets using `react-virtuoso`
- **Normalized state management** - Clean separation of rows and columns data
- **Custom component architecture** - No external table libraries, built from scratch
- **Production-ready deployment** - Docker + Nginx configuration included

The implementation focuses on readability, maintainability, and building table behavior from first principles.

## Features

### Core Functionality

- **Schema-driven column definitions** - Define table structure through configuration
- **Inline editing** - Click cells to edit with custom editors per column type
- **Column visibility panel** - Toggle which columns are displayed
- **Efficient virtualization** - Smooth scrolling for thousands of rows
- **Normalized data structure** - Clean state management with `rowsById`, `rowIds`, `columnsById`, `columnOrder`
- **Clear keyboard/focus behavior** - Intuitive navigation and editing
- **Extensible architecture** - Easy to add new renderers and editors

### Data Structure

The table uses a normalized state pattern:

```javascript
{
  rowsById: { [id]: { ...rowData } },
  rowIds: [id1, id2, ...],
  columnsById: { [id]: { ...columnConfig } },
  columnOrder: [colId1, colId2, ...]
}
```

## Project Structure

```
.
├── Dockerfile
├── nginx.conf
├── package.json
├── vite.config.js
├── src
│   ├── main.jsx
│   ├── index.css
│   ├── App.jsx
│   └── features
│       └── table
│           ├── components
│           │   ├── Table.jsx
│           │   ├── TableBody.jsx
│           │   ├── TableHeader.jsx
│           │   ├── TableRow.jsx
│           │   ├── TableCell.jsx
│           │   ├── ColumnSelector.jsx
│           │   └── SaveButton.jsx
│           ├── hooks
│           │   ├── useTableData.js
│           │   ├── useColumnVisibility.js
│           │   └── useCellEditing.js
│           ├── renderers
│           │   ├── StringCellView.jsx
│           │   └── SelectCellView.jsx
│           ├── editors
│           │   ├── StringEditor.jsx
│           │   └── BooleanEditor.jsx
│           └── utils
│               └── constants.js
```

### Architecture Principles

- **Hooks** - Contain logic for data management, editing state, and column visibility
- **Components** - Handle layout and rendering concerns
- **Renderers/Editors** - Map column types to specific UI behaviors
- **CSS Grid** - Defines responsive table layout, synchronized between header and rows
- **Virtualization** - Ensures smooth performance for large datasets

## Running with Docker (Production Build)

Build the image:

```bash
docker build -t generic-table .
```

Run the container:

```bash
docker run -d -p 8080:80 generic-table
```

Open the application:

```
http://localhost:8080
```

### Dockerfile Overview

The Dockerfile uses a multi-stage build:

- **Stage 1:** Builds the React app using Node
- **Stage 2:** Serves static files via Nginx
- SPA routing configured using `try_files` in `nginx.conf`

## Extending the Table

### Adding a New Column Type

1. Create a renderer in `src/features/table/renderers/`
2. Create an editor in `src/features/table/editors/`
3. Map the type in your column configuration
4. Add any type-specific logic in the appropriate hooks

### Example Column Configuration

```javascript
{
  id: 'status',
  label: 'Status',
  type: 'select',
  options: ['Active', 'Inactive', 'Pending'],
  visible: true
}
```

---

**Built with React, Vite, and modern web standards. No external table libraries required.**
