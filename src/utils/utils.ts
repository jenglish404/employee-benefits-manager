import {
  DEPENDENT_BENEFIT_COST_PER_YEAR,
  EMPLOYEE_BENEFIT_COST_PER_YEAR,
} from "~/constants";
import { Dependent } from "~/types";

/** Generate a unique ID. */
export const uid = () => Math.random().toString(36).substring(2, 15);

/**
 * Create a network delay between 300ms to 1000ms.
 *
 * @returns A promise that can be awaited.
 */
export const networkDelay = async (): Promise<void> => {
  const min = 300;
  const max = 1000;
  const delay = Math.floor(Math.random() * (max - min + 1) + min);
  new Promise((resolve) => setTimeout(resolve, delay));
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
export const getBenefitsCost = (firstName: string, dependents: Dependent[]) => {
  // 1. Calculate employee cost per year.
  const employeeCost = firstName?.toUpperCase().startsWith("A")
    ? EMPLOYEE_BENEFIT_COST_PER_YEAR * 0.9
    : EMPLOYEE_BENEFIT_COST_PER_YEAR;

  // 2. Calculate the dependent(s) cost per year.
  const dependentCost = dependents?.reduce((acc, cur) => {
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
