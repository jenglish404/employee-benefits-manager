import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { EMPLOYEE_SALARY_PER_PAY_PERIOD } from "~/constants";
import { formatNumber } from "~/utils";

type CostSummaryProps = {
  currentCost: number;
  updatedCost?: number;
};

/** Cost summary table for an individual employee. */
export default function CostSummary({
  currentCost,
  updatedCost,
}: CostSummaryProps) {
  // Only have an `updatedCost` on the Update page.
  const isCreate = updatedCost === undefined;
  const currentCostDisplay = `$${formatNumber(currentCost)}`;
  const salaryDisplay = `$${formatNumber(EMPLOYEE_SALARY_PER_PAY_PERIOD)}`;
  let netPay = EMPLOYEE_SALARY_PER_PAY_PERIOD - currentCost;
  let netPayDisplay = `$${formatNumber(netPay)}`;

  // Smaller summary for Create page.
  if (isCreate) {
    return (
      <TableContainer component={Paper} sx={{ maxWidth: 400 }}>
        <Table size="small" aria-label="employee benefits cost summary">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} align="center">
                Summary per Pay Period
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell variant="head">Salary</TableCell>
              <TableCell>
                <Typography>{salaryDisplay}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Benefit Cost</TableCell>
              <TableCell>
                <Typography color="error">-{currentCostDisplay}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Net Pay</TableCell>
              <TableCell>
                <Typography>{netPayDisplay}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const updatedCostDisplay = `$${formatNumber(updatedCost)}`;
  const diff = updatedCost - currentCost;
  const diffDisplay =
    diff <= 0 ? `$${formatNumber(Math.abs(diff))}` : `-$${formatNumber(diff)}`;
  const diffVariant = diff <= 0 ? "success" : "error";
  netPay = EMPLOYEE_SALARY_PER_PAY_PERIOD - updatedCost;
  netPayDisplay = `$${formatNumber(netPay)}`;

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 400 }}>
      <Table size="small" aria-label="employee benefits cost summary">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="center">
              Summary per Pay Period
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell variant="head">Salary</TableCell>
            <TableCell>
              <Typography>{salaryDisplay}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Benefit Cost</TableCell>
            <TableCell>
              <Typography color="error">-{currentCostDisplay}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Cost with Updates</TableCell>
            <TableCell>
              <Typography>-{updatedCostDisplay}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Difference</TableCell>
            <TableCell>
              <Typography color={diffVariant}>{diffDisplay}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Net Pay</TableCell>
            <TableCell>
              <Typography>{netPayDisplay}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
