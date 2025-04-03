import { Employee } from "~/types";
import { Database } from "~/db";

const testEmployee: Employee = {
  firstName: "James",
  lastName: "Bond",
  dependents: [],
  benefitsCost: 1000,
};

/** Clone and return an employee. */
const clone = (emp: Employee): Employee => JSON.parse(JSON.stringify(emp));

describe("Database", () => {
  const db = new Database();

  afterEach(() => {
    db.clearAll();
  });

  test("creates db entry", () => {
    // new employee.
    const employee = clone(testEmployee);

    // create.
    const created = db.create(employee);
    expect(created).toBeDefined();
    expect(created?.id).toBeDefined();

    // read it back.
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const readVal = db.read(created?.id!);
    expect(readVal).toBeDefined();
    expect(employee.id).toEqual(readVal?.id);
  });

  test("updates db entry", () => {
    // new employee.
    const employee = clone(testEmployee);

    // create.
    const created = db.create(employee);
    if (!created) fail("employee not created");

    // update.
    created!.lastName = "updatedLastName";
    const updated = db.update(created.id!, created);
    if (!updated) fail("employee not updated");

    // read it back.
    const updatedVal = db.read(updated.id!);
    expect(updatedVal?.lastName).toEqual("updatedLastName");
  });

  test("gets all db entries", () => {
    const employee1 = clone(testEmployee);
    const employee2 = clone(testEmployee);

    // create.
    db.create(employee1);
    db.create(employee2);

    // assert entries are equal to inputs.
    const all = db.getAll();

    expect(all).toHaveLength(2);
  });

  test("deletes entry", () => {
    // new employee.
    const employee = clone(testEmployee);

    // create.
    const created = db.create(employee);
    if (!created) fail("employee not created");

    // delete.
    const deleted = db.delete(created.id!);
    expect(deleted).toBe(true);

    // should now be undefined.
    const entry = db.read(created.id!);
    expect(entry).toBeUndefined();
  });

  test("returns undefined if created entry already exists", () => {
    // new employee.
    const employee = clone(testEmployee);

    // create.
    const created = db.create(employee);
    if (!created) fail("employee not created");

    // try creating the same employee.
    const result = db.create(created);
    expect(result).toBeUndefined();

    // original value persists.
    const createdVal = db.read(created.id!);
    expect(createdVal).toEqual(created);
  });

  test("returns undefined if employee does not exist", () => {
    // employee.
    const employee = clone(testEmployee);

    const result = db.update("nope", employee);
    expect(result).toBeUndefined();
  });

  test("does not allow update of employee id", () => {
    // employee.
    const employee = clone(testEmployee);

    // create.
    const created = db.create(employee);
    if (!created) fail("employee not created");

    // attempt to change id.
    const origId = created.id;
    created.id = "nope";
    const updated = db.update(origId!, created);
    expect(updated).toBeUndefined();
  });

  test("returns false if employee to delete does not exist", () => {
    const result = db.delete("nope");
    expect(result).toEqual(false);
  });
});
