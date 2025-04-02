import { createContext, useContext } from "react";
import { EmployeeApi } from "~/api";

/** Fallback API if one is not provided. */
const employeeApi = new EmployeeApi(false);

/** The API context. */
const EmployeeApiContext = createContext(employeeApi);

/** The API context provider. */
export const EmployeeApiProvider = EmployeeApiContext.Provider;

/**
 * Hook for retrieving the Employee API.
 */
export function useEmployeeApi() {
  const api = useContext(EmployeeApiContext);
  return api;
}
