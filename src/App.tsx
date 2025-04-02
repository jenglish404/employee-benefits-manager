import { Container, Typography } from "@mui/material";
import { EmployeeApi } from "./api";
import { useEffect, useState } from "react";
import { Employee } from "./types";

const api = new EmployeeApi();

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const load = async () => {
      const all = await api.getAll();
      setEmployees(all);
      console.log(all);
    };

    load();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h5">Benefits</Typography>
    </Container>
  );
}

export default App;
