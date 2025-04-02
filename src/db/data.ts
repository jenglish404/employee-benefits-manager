import { Employee } from "~/types";
import { uid } from "~/utils";
import { InMemoryDatabase } from "./db";

/** Seed data for the employee database. */
export const seedData: Employee[] = [
  {
    id: uid(),
    firstName: "Fred",
    lastName: "Flintstone",
    dependents: [
      { id: uid(), firstName: "Wilma", lastName: "Flintstone" },
      { id: uid(), firstName: "Pebbles", lastName: "Flintstone" },
      { id: uid(), firstName: "Bam-Bam", lastName: "Flintstone" },
    ],
  },
  {
    id: uid(),
    firstName: "Tony",
    lastName: "Soprano",
    dependents: [
      { id: uid(), firstName: "Carmela", lastName: "Soprano" },
      { id: uid(), firstName: "AJ", lastName: "Soprano" },
      { id: uid(), firstName: "Meadow", lastName: "Soprano" },
    ],
  },
  {
    id: uid(),
    firstName: "Padme",
    lastName: "Amidala",
    dependents: [
      { id: uid(), firstName: "Luke", lastName: "Skywalker" },
      { id: uid(), firstName: "Leia", lastName: "Organa" },
    ],
  },
  {
    id: uid(),
    firstName: "James",
    lastName: "Bond",
    dependents: [],
  },
  {
    id: uid(),
    firstName: "Daenerys",
    lastName: "Targaryen",
    dependents: [
      { id: uid(), firstName: "Drogon" },
      { id: uid(), firstName: "Rhaegal" },
      { id: uid(), firstName: "Viserion" },
    ],
  },
];

/** Employee data. */
export const employeeDatabase = new InMemoryDatabase();

seedData.forEach((emp) => {
  employeeDatabase.create(emp.id, emp);
});
