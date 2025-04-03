import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import { Link as RouterLink, Outlet, useNavigate } from "react-router";
import { useEmployeeApi } from "~/contexts";
import { Employee } from "~/types";

const drawerWidth = 300;

export default function Root() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const api = useEmployeeApi();

  // Initial data load.
  useEffect(() => {
    const load = async () => {
      const all = await api.getAll();
      setEmployees(all);
    };

    load();
  }, []);

  const handleRefresh = async () => {
    const all = await api.getAll();
    setEmployees(all);
  };

  return (
    <Box display="flex">
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Employee Benefits
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Link component={RouterLink} to="/">
            <IconButton aria-label="Home">
              <HomeIcon />
            </IconButton>
          </Link>
        </Toolbar>
        <Divider />
        <List>
          <ListItem>
            <Button variant="contained" onClick={() => navigate("/create")}>
              Create
            </Button>
          </ListItem>
          {employees.map((emp) => (
            <ListItem key={emp.id} disablePadding>
              <ListItemButton onClick={() => navigate(`/${emp.id}`)}>
                <ListItemText primary={`${emp.firstName} ${emp.lastName}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" flexGrow={1} p={3}>
        <Toolbar />
        <Outlet context={{ onRefresh: handleRefresh }} />
      </Box>
    </Box>
  );
}
