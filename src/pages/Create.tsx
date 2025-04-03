import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dependent } from "~/types";
import { uid } from "~/utils";
import { useState } from "react";
import { useEmployeeApi } from "~/contexts/apiContext";
import { useNavigate, useOutletContext } from "react-router";
import { RootContext } from "./Root";

/** Set a reasonable limit so the UI doesn't get out of control. */
const DEPENDENT_LIMIT = 10;

type CreateFormData = {
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
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
    })
  ),
});

/**
 * Page to create a new employee.
 * @returns JSX for the create page.
 */
export default function Create() {
  const navigate = useNavigate();
  const { onRefresh } = useOutletContext<RootContext>();
  const api = useEmployeeApi();
  const [isBusy, setIsBusy] = useState(false);

  // react-hook-form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dependents: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dependents",
  });

  /** Form submit handler. */
  const onSubmit = async (data: CreateFormData) => {
    setIsBusy(true);
    const created = await api.createEmployee(data);
    onRefresh();
    setIsBusy(false);
    navigate(`/${created.data?.id}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} maxWidth={800} width={1}>
        <Typography variant="h5">Create Employee</Typography>
        <Stack spacing={3} direction="row">
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
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
            render={({ field }) => (
              <TextField
                {...field}
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
                    onClick={() =>
                      append({ id: uid(), firstName: "", lastName: "" })
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
                      render={({ field }) => (
                        <TextField
                          {...field}
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
                      render={({ field }) => (
                        <TextField
                          {...field}
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
            Submit
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
