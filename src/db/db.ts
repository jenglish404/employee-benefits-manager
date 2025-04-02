import { Employee } from "~/types";
import { uid } from "~/utils";

export class Database {
  private data: Map<string, Employee>;

  constructor() {
    this.data = new Map<string, Employee>();
  }

  /**
   * Create a new employee.
   *
   * @param value The employee data.
   * @returns The employee record.
   */
  create(value: Employee) {
    if (value.id && this.data.has(value.id)) {
      // Employee already exists
      return;
    }

    // Set unique IDs, if necessary.
    value.id = value.id || uid();
    value.dependents.forEach((d) => {
      d.id = d.id || uid();
    });

    this.data.set(value.id, value);
    return value;
  }

  /**
   * Read an employee record.
   *
   * @param id ID of the employee.
   * @returns The employee data.
   */
  read(id: string) {
    return this.data.get(id);
  }

  /**
   * Update an existing employee.
   *
   * @param id ID of the employee.
   * @param value The updated employee data if successful, otherwise undefined.
   * @returns
   */
  update(id: string, value: Employee) {
    if (!this.data.has(id)) {
      // Employee does not exist.
      return;
    }

    if (id !== value.id) {
      // Cannot update id property.
      return;
    }

    this.data.set(id, value);
    return this.data.get(id);
  }

  /**
   * Delete an employee.
   *
   * @param id ID of the employee.
   * @returns `true` if successful, otherwise `false`.
   */
  delete(id: string) {
    if (!this.data.has(id)) {
      // Employee does not exist
      return false;
    }

    this.data.delete(id);
    return true;
  }

  /**
   * Get list of all employees.
   *
   * @returns An array of employees.
   */
  getAll() {
    const employees: Employee[] = [];
    this.data.forEach((value) => employees.push(value));
    return employees;
  }

  /**
   * Clear the db. Used for unit tests.
   */
  clearAll() {
    this.data.clear();
  }
}
