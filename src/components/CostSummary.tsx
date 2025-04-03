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
  const currentCostDisplay = `$${currentCost.toFixed(2)}`;

  // Smaller summary for Create page.
  if (isCreate) {
    return (
      <TableContainer component={Paper} sx={{ maxWidth: 400 }}>
        <Table size="small" aria-label="employee benefits cost summary">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} align="center">
                Cost Summary
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell variant="head">Cost per Pay Period</TableCell>
              <TableCell>
                <Typography color="success">{currentCostDisplay}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const updatedCostDisplay = `$${updatedCost.toFixed(2)}`;
  const diff = updatedCost - currentCost;
  const diffDisplay =
    diff < 0 ? `-$${Math.abs(diff).toFixed(2)}` : `$${diff.toFixed(2)}`;
  const diffVariant = diff <= 0 ? "success" : "error";

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 400 }}>
      <Table size="small" aria-label="employee benefits cost summary">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="center">
              Cost Summary
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell variant="head">Cost per Pay Period</TableCell>
            <TableCell>
              <Typography color="success">{currentCostDisplay}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Cost with Updates</TableCell>
            <TableCell>
              <Typography color="success">{updatedCostDisplay}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Difference</TableCell>
            <TableCell>
              <Typography color={diffVariant} fontWeight="bold">
                {diffDisplay}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
