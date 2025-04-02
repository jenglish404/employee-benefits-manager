/**
 * Properties common to employees and dependents.
 */
type Person = {
  /** First name. */
  firstName: string;
  /** Last name. */
  lastName: string;
};

/**
 * An employee.
 */
export type Employee = Person & {
  /** Employee ID. */
  id?: string;
  /** Dependents of the employee. */
  dependents: Dependent[];
  /** Cost of health benefits per paycheck. */
  benefitsCost: number;
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

/** API response. */
export type ApiResponse<T> = {
  /** Reponse data, if any. */
  data?: T;
  /** Error message, if any. */
  error?: string;
};
