import { Employee } from "~/types";
import { InMemoryDatabase } from "./db";
import { seedData } from "./data";

const mockEmployee: Employee = JSON.parse(JSON.stringify(seedData[0]));

describe("InMemoryDatabase", () => {
  const db = new InMemoryDatabase();

  beforeEach(() => {
    db.clearAll();
  });

  test("creates db entry", () => {
    // create new entry.
    const result = db.create("test", mockEmployee);
    expect(result).toEqual(true);

    // read it back.
    const createdVal = db.read("test");
    expect(createdVal).toEqual(mockEmployee);
  });

  test("updates db entry", () => {
    // create new entry.
    const result = db.create("test", mockEmployee);
    expect(result).toEqual(true);

    const updatedEmployee = { ...mockEmployee, firstName: "updated" };

    // update.
    const updated = db.update("test", updatedEmployee);
    expect(updated).toEqual(true);

    // read it back.
    const updatedVal = db.read("test");
    expect(updatedVal).toEqual(updatedEmployee);
  });

  test("gets all db entries", () => {
    // create entries.
    seedData.forEach((emp) => {
      db.create(emp.id, emp);
    });

    // assert entries are equal to inputs.
    const result = db.getAll();
    let i = 0;
    result.forEach((value, _) => {
      expect(value).toEqual(seedData[i]);
      i++;
    });
  });

  test("deletes entry", () => {
    // create.
    db.create("test", mockEmployee);

    // verify it's there.
    const result = db.read("test");
    expect(result).toEqual(mockEmployee);

    // delete it.
    const deleted = db.delete("test");
    expect(deleted).toBe(true);

    // should now be undefined.
    const entry = db.read("test");
    expect(entry).toBeUndefined();
  });

  test("returns false if created entry already exists", () => {
    // create.
    db.create("test", mockEmployee);

    // try creating with the same key.
    const result = db.create("test", mockEmployee);
    expect(result).toEqual(false);

    // original value persists.
    const createdVal = db.read("test");
    expect(createdVal).toEqual(mockEmployee);
  });

  test("returns false if key to update does not exist", () => {
    const result = db.update("nope", mockEmployee);
    expect(result).toEqual(false);
  });

  test("returns false if key to delete does not exist", () => {
    const result = db.delete("nope");
    expect(result).toEqual(false);
  });
});
