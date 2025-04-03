import { BrowserRouter, Route, Routes } from "react-router";
import { EmployeeApi } from "~/api";
import { EmployeeApiProvider } from "~/contexts";
import Root from "~/pages/Root";
import Home from "~/pages/Home";
import Update from "~/pages/Update";
import Create from "~/pages/Create";

const api = new EmployeeApi();

export default function App() {
  return (
    <EmployeeApiProvider value={api}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="create" element={<Create />} />
            <Route path=":employeeId" element={<Update />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </EmployeeApiProvider>
  );
}
