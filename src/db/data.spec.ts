import { employeeDatabase } from "./data";

describe("employee database", () => {
  test("db contains seed data", () => {
    const all = employeeDatabase.getAll();
    all.forEach((value, key) => {
      expect(key).toBeDefined();
      expect(value).toBeDefined();
      expect(value.dependents).toBeDefined();
    });
  });
});
