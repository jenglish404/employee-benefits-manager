import { Employee } from "~/types";

/**
 * Basic in-memory database with support for CRUD operations.
 */
export class InMemoryDatabase {
  private data: Map<string, Employee>;

  constructor() {
    this.data = new Map<string, Employee>();
  }

  create(key: string, value: Employee) {
    if (this.data.has(key)) {
      // Key already exists
      return false;
    }

    this.data.set(key, value);
    return true;
  }

  read(key: string) {
    return this.data.get(key);
  }

  update(key: string, value: Employee) {
    if (!this.data.has(key)) {
      // Key does not exist
      return false;
    }

    this.data.set(key, value);
    return true;
  }

  delete(key: string) {
    if (!this.data.has(key)) {
      // Key does not exist
      return false;
    }

    this.data.delete(key);
    return true;
  }

  getAll() {
    return this.data;
  }

  // Used for unit tests.
  clearAll() {
    this.data.clear();
  }
}
