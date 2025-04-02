import { Database } from "~/db";
import { ApiResponse, Dependent, Employee, EmployeeMutation } from "~/types";
import { networkDelay } from "~/utils";
import { seedData } from "./data";

/** The base cost of employee health benefits per year. */
const EMPLOYEE_BENEFIT_COST_PER_YEAR = 1000;

/** The base cost of dependent health benefits per year. */
const DEPENDENT_BENEFIT_COST_PER_YEAR = 500;

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
      firstName,
      lastName,
      dependents,
      benefitsCost: this.getBenefitsCost(firstName, dependents),
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
   * Business logic to calculate the cost of benefits per paycheck for an employee.
   *
   * 1. Cost of benefits is `EMPLOYEE_BENEFIT_COST_PER_YEAR`/yr for the employee (default: $1,000/yr).
   *    - If their first name starts with "A", they get a 10% discount.
   * 2. Each dependent incurs a cost of `DEPENDENT_BENEFIT_COST_PER_YEAR`/yr (default: $500/yr).
   *    - If their first name starts with "A", they get a 10% discount.
   *
   * An employee is paid 26 times per year.
   *
   * @param firstName The first name of the employee.
   * @param dependents The employee's dependents.
   * @returns The cost of benefits per paycheck.
   */
  private getBenefitsCost = (firstName: string, dependents: Dependent[]) => {
    // 1. Calculate employee cost per year.
    const employeeCost = firstName.toUpperCase().startsWith("A")
      ? EMPLOYEE_BENEFIT_COST_PER_YEAR * 0.9
      : EMPLOYEE_BENEFIT_COST_PER_YEAR;

    // 2. Calculate the dependent(s) cost per year.
    const dependentCost = dependents.reduce((acc, cur) => {
      const cost = cur.firstName.toUpperCase().startsWith("A")
        ? DEPENDENT_BENEFIT_COST_PER_YEAR * 0.9
        : DEPENDENT_BENEFIT_COST_PER_YEAR;
      return acc + cost;
    }, 0);

    // Total cost per year.
    const totalCost = employeeCost + dependentCost;

    // Employee is paid 26 times per year.
    return totalCost / 26;
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
      benefitsCost: this.getBenefitsCost(firstName, dependents),
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
