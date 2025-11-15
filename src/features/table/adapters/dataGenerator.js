
/**
 * Generates a demo table schema and randomly populated dataset.
 *
 * @param {number} rowCount - Number of rows to generate.
 * @returns {{
 *   columns: any[],
 *   data: any[]
 * }} A full table schema + generated rows.
 */

export function generateSchemaAndData(rowCount = DEFAULT_GENERATED_ROWS) {
  const columns = [
    {
      id: "name",
      ordinalNo: 1,
      title: "Full Name",
      type: "string",
      width: 200,
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

  const roles = ["admin", "manager", "user", "guest"];
  const data = [];

  for (let i = 1; i <= rowCount; i++) {
    data.push({
      id: `row-${i}`,
      name: `User ${i}`,
      age: Math.floor(Math.random() * 60) + 18,
      isActive: Math.random() > 0.5,
      role: roles[Math.floor(Math.random() * roles.length)],
    });
  }

  return { columns, data };
}
