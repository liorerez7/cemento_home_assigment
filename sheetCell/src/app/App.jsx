// src/app/App.js
import React from "react";
import Table from "../features/table/components/Table";

// NOTE:
// In the future, this data should come from an adapter:
// - localStorageAdapter.getSchemaAndData()
// - or dataGenerator using @faker-js/faker
// For now we hard-code a small mock dataset to see something on screen.

const MOCK_COLUMNS = [
  {
    id: "name",
    ordinalNo: 1,
    title: "Name",
    type: "string",
    width: 180,
  },
  {
    id: "age",
    ordinalNo: 2,
    title: "Age",
    type: "number",
    width: 80,
  },
  {
    id: "isActive",
    ordinalNo: 3,
    title: "Active",
    type: "boolean",
    width: 100,
  },
  {
    id: "role",
    ordinalNo: 4,
    title: "Role",
    type: "select",
    width: 140,
  },
];

const MOCK_DATA = [
  {
    id: "row-1",
    name: "Alice Johnson",
    age: 28,
    isActive: true,
    role: "admin",
  },
  {
    id: "row-2",
    name: "Bob Smith",
    age: 34,
    isActive: false,
    role: "user",
  },
  {
    id: "row-3",
    name: "Charlie Green",
    age: 41,
    isActive: true,
    role: "manager",
  },
  {
    id: "row-4",
    name: "Dana White",
    age: 23,
    isActive: true,
    role: "user",
  },
  {
    id: "row-5",
    name: "Eli Cohen",
    age: 30,
    isActive: false,
    role: "guest",
  },
];

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="app-title">Generic Table Demo</h1>
        <p className="app-subtitle">
          Schema-driven table with basic rendering and column visibility.
        </p>
      </header>

      <main className="app-main">
        <div className="app-table-wrapper">
          <Table initialColumns={MOCK_COLUMNS} initialData={MOCK_DATA} />
        </div>
      </main>
    </div>
  );
}

export default App;
