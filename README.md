# Employee Benefits Manager

## Run it

To get this up and running, please do the following:

1. Install: `npm i`
1. Run: `npm run dev`
1. Go to [http://localhost:3000](http://localhost:3000)

You will see a dashboard listing the seeded employees. You can create new employees and update existing ones.

While the "backend" is wired for `delete`, I did not add functionality for deleting employees to the UI.

## Test it

To run the unit tests: `npm test`

Normally, I would have written far more unit tests. If this were a "real" project, these would not be neglected.

### Tech Stack

This project is using:

1. [Vite](https://vite.dev/guide/): A lightning fast build tool with a great developer experience.
1. [React](https://react.dev/): Great for composing frontends from individual components.
1. [Material UI](https://mui.com/material-ui/getting-started/): A React component library, so that things look nice.
1. [react-router](https://reactrouter.com/home): A multi-strategy router for React.
1. [react-hook-form](https://www.react-hook-form.com/get-started/): Performant, flexible and extensible form validation for React.
1. [zod](https://zod.dev/): TypeScript schema validation that works with [react-hook-form](https://react-hook-form.com/get-started#SchemaValidation).
1. [Jest](https://jestjs.io/docs/getting-started): For running unit tests.

### Goal & Premise

The goal of this coding exercise was to design a UI and backend for managing employee health benefits.

Requirements:

- Mock out an API for the retrieval of employee/dependent data
  - The api is [here](./src/api/api.ts)
  - The db is [here](./src/db/db.ts)
  - The seed data is [here](./src/api/data.ts)
  - **NOTE**: Refreshing the page will wipe everything and you'll start fresh with the seed data.
- List out the employee and their dependents
- Allow the user to change their elections and display a preview of the calculated benefits
- CRUD functionality
  - You can add/edit an employee and dependents
- The user can save their changes and see the updated result

Calculation:

- The cost of benefits is $1000/year for each employee
- Each dependent (children and possibly spouses) incurs a cost of $500/year
- Anyone whose name starts with ‘A’ gets a 10% discount, employee or dependent

Assumptions:

- All employees are paid $2000 per paycheck before deductions
- There are 26 paychecks in a year

Have fun!
