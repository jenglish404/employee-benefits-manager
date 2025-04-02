/**
 * Properties common to employees and dependents.
 */
type Person = {
  /** First name. */
  firstName: string;
  /** Last name. */
  lastName?: string;
};

/**
 * An employee.
 */
export type Employee = Person & {
  /** Employee ID. */
  id?: string;
  /** Dependents of the employee. */
  dependents: Dependent[];
};

/**
 * A dependent of an employee.
 */
export type Dependent = Person & {
  /** Dependent ID. */
  id?: string;
};

/**
 * Upsert employee mutation data.
 */
export type EmployeeMutation = {
  firstName?: string;
  lastName?: string;
  dependents?: Dependent[];
};
