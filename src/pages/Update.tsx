import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddIcon from "@mui/icons-material/Add";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEmployeeApi } from "~/contexts";
import { Dependent, Employee, RootContext } from "~/types";
import { DEPENDENT_LIMIT } from "~/constants";
import { getBenefitsCost, uid } from "~/utils";
import CostSummary from "~/components/CostSummary";

type UpdateFormData = {
  firstName: string;
  lastName: string;
  dependents: Dependent[];
};

// Form validation.
const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dependents: z.array(
    z.object({
      id: z.string().optional(),
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
    })
  ),
});

/** Page for displaying and updating employee data. */
export default function Update() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const { onRefresh } = useOutletContext<RootContext>();
  const api = useEmployeeApi();
  const [loading, setLoading] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
  const [employee, setEmployee] = useState<Employee>();
  const [cost, setCost] = useState<number>(0);

  // react-hook-form setup
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UpdateFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: employee?.firstName,
      lastName: employee?.lastName,
      dependents: employee?.dependents,
    },
  });

  const watchFields = watch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dependents",
  });

  /** Form submit handler. */
  const onSubmit = async (data: UpdateFormData) => {
    setIsBusy(true);
    await api.updateEmployee(employeeId!, data);
    onRefresh();
    setIsBusy(false);
    navigate(`/`);
  };

  useEffect(() => {
    const newCost = getBenefitsCost(
      watchFields.firstName,
      watchFields.dependents
    );
    setCost(newCost);
  }, [watchFields]);

  // Initial data load.
  useEffect(() => {
    const load = async () => {
      if (employeeId) {
        const resp = await api.readEmployee(employeeId!);
        if (resp.data) {
          setEmployee(resp.data);
          setCost(resp.data.benefitsCost);
          reset(resp.data);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} maxWidth={800} width={1}>
        <Typography variant="h5">
          Update Employee: {`${employee.firstName} ${employee.lastName}`}
        </Typography>

        <Box display="flex" justifyContent="center">
          <CostSummary currentCost={employee.benefitsCost} updatedCost={cost} />
        </Box>

        <Stack spacing={3} direction="row">
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                size="small"
                label="First Name"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                margin="normal"
                fullWidth
                autoComplete="off"
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                size="small"
                label="Last Name"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                margin="normal"
                fullWidth
                autoComplete="off"
              />
            )}
          />
        </Stack>

        <Card variant="outlined">
          <CardHeader
            title="Dependents"
            action={
              <Tooltip
                title={
                  fields.length < DEPENDENT_LIMIT
                    ? "Add dependents"
                    : `You've reached the limit of ${DEPENDENT_LIMIT} dependents`
                }
              >
                <span>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() =>
                      append(
                        { id: uid(), firstName: "", lastName: "" },
                        { focusName: `dependents.${fields.length}.firstName` }
                      )
                    }
                    disabled={!(fields.length < DEPENDENT_LIMIT)}
                  >
                    Add
                  </Button>
                </span>
              </Tooltip>
            }
          />
          <CardContent>
            <Stack spacing={3}>
              {fields.map((item, index) => (
                <Box display="flex" key={item.id}>
                  <Stack spacing={3} direction="row" display="flex" width={1}>
                    <Controller
                      name={`dependents.${index}.firstName`}
                      control={control}
                      defaultValue=""
                      render={({ field: { ref, ...field } }) => (
                        <TextField
                          {...field}
                          inputRef={ref}
                          size="small"
                          label="First Name"
                          error={!!errors.dependents?.[index]?.firstName}
                          helperText={
                            errors.dependents?.[index]?.firstName?.message
                          }
                          margin="normal"
                          fullWidth
                          autoComplete="off"
                        />
                      )}
                    />
                    <Controller
                      key={`create-dep-${index}`}
                      name={`dependents.${index}.lastName`}
                      control={control}
                      defaultValue=""
                      render={({ field: { ref, ...field } }) => (
                        <TextField
                          {...field}
                          inputRef={ref}
                          size="small"
                          label="Last Name"
                          error={!!errors.dependents?.[index]?.lastName}
                          helperText={
                            errors.dependents?.[index]?.lastName?.message
                          }
                          margin="normal"
                          fullWidth
                          autoComplete="off"
                        />
                      )}
                    />
                    <IconButton color="error" onClick={() => remove(index)}>
                      <RemoveCircleIcon />
                    </IconButton>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Box display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            loading={isBusy}
          >
            Save
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
