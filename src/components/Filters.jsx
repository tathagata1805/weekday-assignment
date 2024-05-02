import { Box, Grid, TextField } from "@mui/material";
import Filter from "./Filter";
import { ROLE_OPTIONS } from "../constants/constants";
import { NUMBER_OF_EMPLOYEES_OPTIONS } from "../constants/constants";
import { EXPERIENCE_OPTIONS } from "../constants/constants";
import { MODE_OPTIONS } from "../constants/constants";
import { MIN_SALARY_OPTIONS } from "../constants/constants";
import { useDispatch } from "react-redux";
import { setFilter } from "../redux/actions";

export function Filters() {
  const dispatch = useDispatch();

  const handleSetFilter = (filterName, value) => {
    dispatch(setFilter(filterName, value));
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Filter
            options={ROLE_OPTIONS}
            placeholder="Role"
            label="Roles"
            onChange={handleSetFilter}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Filter
            options={NUMBER_OF_EMPLOYEES_OPTIONS}
            placeholder="Number of Emplopyees"
            label="Number of Employees"
            onChange={handleSetFilter}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Filter
            options={EXPERIENCE_OPTIONS}
            placeholder="Experience"
            label="Experience"
            onChange={handleSetFilter}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Filter
            options={MODE_OPTIONS}
            placeholder="Mode"
            label="Mode"
            onChange={handleSetFilter}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Filter
            options={MIN_SALARY_OPTIONS}
            placeholder="Minimum Salary"
            label="Minimum Base Pay Salary"
            onChange={handleSetFilter}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <TextField
            fullWidth
            id="Company Name"
            label="Search Company Name"
            variant="outlined"
            onChange={(event) => {
              dispatch(setFilter("companyName", event.target.value));
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
