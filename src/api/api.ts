import { Database } from "~/db";
import { ApiResponse, Dependent, Employee, EmployeeMutation } from "~/types";
import { getBenefitsCost, networkDelay } from "~/utils";
import { seedData } from "./data";

/**
 * The employee API with fake network delays.
 */
export class EmployeeApi {
  private db: Database;

  /**
   * Constructor.
   *
   * @param seed Whether to seed with employee data (default: `true`);
   */
  constructor(seed: boolean = true) {
    this.db = new Database();
    if (seed) {
      this.seed();
    }
  }

  /**
   * Create a new employee.
   *
   * @param mutation The employee to create.
   * @returns The created employee.
   */
  createEmployee = async (
    mutation: EmployeeMutation
  ): Promise<ApiResponse<Employee>> => {
    await networkDelay();

    if (!mutation.firstName) {
      return { error: "First name is required." };
    }

    const firstName = mutation.firstName;
    const lastName = mutation.lastName || "";
    const dependents = mutation.dependents || [];
    const toCreate = this.toEmployee(firstName, lastName, dependents);

    const employee = this.db.create(toCreate);

    if (!employee) {
      return { error: "There was a problem creating the employee record." };
    }

    return { data: employee };
  };

  /**
   * Read an employee record.
   *
   * @param id ID of the employee.
   * @returns The employee.
   */
  readEmployee = async (id: string): Promise<ApiResponse<Employee>> => {
    await networkDelay();

    const employee = this.db.read(id);
    if (!employee) {
      return { error: `Not Found, id: ${id}` };
    }

    return { data: employee };
  };

  /**
   * Update an existing employee.
   *
   * @param id ID of the employee to update.
   * @param mutation Employee data to update.
   * @returns The updated employee.
   */
  updateEmployee = async (
    id: string,
    mutation: EmployeeMutation
  ): Promise<ApiResponse<Employee>> => {
    await networkDelay();

    const employee = this.db.read(id);
    if (!employee) {
      return { error: `Not Found, id: ${id}` };
    }

    // Determine update values.
    const firstName =
      mutation.firstName && mutation.firstName !== employee.firstName
        ? mutation.firstName!
        : employee?.firstName;
    const lastName =
      mutation.lastName && mutation.lastName !== employee.lastName
        ? mutation.lastName
        : employee.lastName;
    const dependents = mutation.dependents
      ? mutation.dependents
      : employee.dependents;

    const toUpdate: Employee = {
      id: employee.id,
      firstName,
      lastName,
      dependents,
      benefitsCost: getBenefitsCost(firstName, dependents),
    };

    const updated = this.db.update(id, toUpdate);
    if (!updated) {
      return { error: `There was a problem updating the employee record.` };
    }

    return { data: updated };
  };

  /**
   * Get a list of all employees.
   *
   * @returns Array of all employees.
   */
  getAll = async (): Promise<Employee[]> => {
    await networkDelay();

    const employees = this.db.getAll();

    return employees;
  };

  /**
   * Helper for creating an employee.
   *
   * @param firstName First name of the employee.
   * @param lastName Last name of the employee.
   * @param dependents The employee's dependents.
   * @returns
   */
  private toEmployee(
    firstName: string,
    lastName: string,
    dependents: Dependent[]
  ): Employee {
    const employee: Employee = {
      firstName,
      lastName,
      dependents,
      benefitsCost: getBenefitsCost(firstName, dependents),
    };

    return employee;
  }

  /** Seed the database with employee data. */
  private seed = () => {
    seedData.forEach((emp) => {
      const firstName = emp.firstName!;
      const lastName = emp.lastName || "";
      const dependents = emp.dependents || [];
      this.db.create(this.toEmployee(firstName, lastName, dependents));
    });
  };
}
