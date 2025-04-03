import {
  Paper,
  Stack,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useOutletContext } from "react-router";
import { RootContext } from "~/types";

export default function Home() {
  const { employees } = useOutletContext<RootContext>();
  console.log(`Home employees`, employees);

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 400 }}>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Dependents</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
    </TableContainer>
  );
}
