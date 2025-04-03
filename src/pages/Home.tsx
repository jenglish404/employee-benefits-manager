import {
  Button,
  Link,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  Link as RouterLink,
  useNavigate,
  useOutletContext,
} from "react-router";
import { EMPLOYEE_SALARY_PER_PAY_PERIOD } from "~/constants";
import { RootContext } from "~/types";
import { formatNumber } from "~/utils";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.black,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/** Home page with list of employees. */
export default function Home() {
  const navigate = useNavigate();
  const { employees } = useOutletContext<RootContext>();

  const salaryDisplay = `$${formatNumber(EMPLOYEE_SALARY_PER_PAY_PERIOD)}`;

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
      <Table size="small" aria-label="list of all employees">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}></TableCell>
            <StyledTableCell colSpan={3} align="center">
              Per Pay Period
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Dependents</TableCell>
            <StyledTableCell align="center">Salary</StyledTableCell>
            <StyledTableCell align="center">Benefits Cost</StyledTableCell>
            <StyledTableCell align="center">Net Pay</StyledTableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees && employees.length > 0 ? (
            employees.map((emp) => {
              const benefitsDisplay = `-$${formatNumber(emp.benefitsCost)}`;
              const netPay = EMPLOYEE_SALARY_PER_PAY_PERIOD - emp.benefitsCost;
              const netPayDisplay = `$${formatNumber(netPay)}`;
              return (
                <StyledTableRow key={emp.id}>
                  <StyledTableCell>
                    <Typography>
                      <Link component={RouterLink} to={`/${emp.id}`}>
                        {`${emp.firstName} ${emp.lastName}`}
                      </Link>
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography>{`${emp.dependents.length}`}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography>{salaryDisplay}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography color="error">{benefitsDisplay}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography color="success">{netPayDisplay}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button onClick={() => navigate(`/${emp.id}`)}>Edit</Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })
          ) : (
            <TableRow>
              <StyledTableCell>Please create some employees!</StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
