import { employeeDatabase } from "./data";

describe("employee database", () => {
  test("db contains seed data", () => {
    const all = employeeDatabase.getAll();
    all.forEach((emp) => {
      expect(emp).toBeDefined();
      expect(emp.id).toBeDefined();
    });
  });
});
