import { EmployeeApi } from "./api";
import { BrowserRouter, Route, Routes } from "react-router";
import Root from "./pages/Root";
import { EmployeeApiProvider } from "./contexts";
import Home from "./pages/Home";
import Benefits from "./pages/Benefits";
import Create from "./pages/Create";

const api = new EmployeeApi();

export default function App() {
  return (
    <EmployeeApiProvider value={api}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="create" element={<Create />} />
            <Route path=":employeeId" element={<Benefits />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </EmployeeApiProvider>
  );
}
