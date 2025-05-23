import { EmployeeMutation } from "~/types";

/** Seed data for the employee database. */
export const seedData: EmployeeMutation[] = [
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
    firstName: "Darth",
    lastName: "Vader",
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
      { firstName: "Drogon", lastName: "Targaryen" },
      { firstName: "Rhaegal", lastName: "Targaryen" },
      { firstName: "Viserion", lastName: "Targaryen" },
    ],
  },
];
