import { Employee } from "~/types";
import { Database } from "./db";

/** Seed data for the employee database. */
export const seedData: Employee[] = [
  {
    firstName: "Fred",
    lastName: "Flintstone",
    dependents: [
      { firstName: "Wilma", lastName: "Flintstone" },
      { firstName: "Pebbles", lastName: "Flintstone" },
      { firstName: "Bam-Bam", lastName: "Flintstone" },
    ],
  },
  {
    firstName: "Tony",
    lastName: "Soprano",
    dependents: [
      { firstName: "Carmela", lastName: "Soprano" },
      { firstName: "AJ", lastName: "Soprano" },
      { firstName: "Meadow", lastName: "Soprano" },
    ],
  },
  {
    firstName: "Padme",
    lastName: "Amidala",
    dependents: [
      { firstName: "Luke", lastName: "Skywalker" },
      { firstName: "Leia", lastName: "Organa" },
    ],
  },
  {
    firstName: "James",
    lastName: "Bond",
    dependents: [],
  },
  {
    firstName: "Daenerys",
    lastName: "Targaryen",
    dependents: [
      { firstName: "Drogon" },
      { firstName: "Rhaegal" },
      { firstName: "Viserion" },
    ],
  },
];

/** Employee data. */
export const employeeDatabase = new Database();

seedData.forEach((emp) => {
  employeeDatabase.create(emp);
});
