import Table from "../features/table/components/Table";

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="app-title">Lior Erez - Home Assigment</h1>
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
