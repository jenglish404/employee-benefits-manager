import { CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useEmployeeApi } from "~/contexts/apiContext";
import { Employee } from "~/types";

export default function Benefits() {
  const { employeeId } = useParams();
  const api = useEmployeeApi();
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState<Employee>();

  useEffect(() => {
    const load = async () => {
      if (employeeId) {
        const resp = await api.readEmployee(employeeId!);
        if (resp.data) {
          setEmployee(resp.data);
        }
      }

      setLoading(false);
    };

    load();
  }, [employeeId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!employee) {
    return <Typography variant="h5">Not Found: {`${employeeId}`}</Typography>;
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5">
        {`${employee.firstName} ${employee.lastName}`}
      </Typography>
    </Stack>
  );
}
