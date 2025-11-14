// src/app/App.js
import Table from "../features/table/components/Table";

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
          <Table />
        </div>
      </main>
    </div>
  );
}

export default App;
