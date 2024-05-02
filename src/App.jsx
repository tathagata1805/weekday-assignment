import React, { useEffect, useState } from "react";
import JobCard from "./components/JobCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid, CircularProgress, Box } from "@mui/material";
import { Filters } from "./components/Filters";
import { useSelector } from "react-redux";

function App() {
  // Why not maintain global state using redux for allJobs?
  // Only single component uses this state hence global state is not required (this is more readable)
  const [allJobs, setAllJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Access the global state for filters from redux store
  const filters = useSelector((state) => state.filters);

  function filterJobs(jobs, filters) {
    return jobs.filter((job) => {
      // Role filter: match any of the selected roles
      const roleMatch =
        filters.role.length === 0 ||
        filters.role.some(
          (role) => role.toLowerCase() === job.jobRole.toLowerCase()
        );

      // Experience filter: assuming you have numerical ranges for experience; adjust as needed
      const experienceMatch =
        filters.experience.length === 0 ||
        filters.experience.some((exp) => {
          const jobMinExp = Number(job.minExp);
          const jobMaxExp = Number(job.maxExp);
          return exp <= jobMaxExp && exp >= jobMinExp;
        });

      // Salary filter: match any of the salary ranges, assumes salaries are provided in some way
      const salaryMatch =
        filters.minimumSalary.length === 0 ||
        filters.minimumSalary.some((salaryRange) => {
          const minSalary = salaryRange.slice(0, -1);
          const jobMinSalary = Number(job.minJdSalary);
          const jobMaxSalary = Number(job.maxJdSalary);
          return jobMinSalary >= minSalary;
        });

      //Could not add the check for company name as the API doesnot return a company name however it would look something like this
      // const companyNameMatch = filters.companyName.length === 0 || job.companyName.toLowerCase() === filters.companyName

      // Combine all matches with AND
      return roleMatch && experienceMatch && salaryMatch;
    });
  }

  // Fetch all jobs on initial render
  useEffect(() => {
    fetchJobs();
  }, []);

  // function to make the api call and fetch jobs from backend
  const fetchJobs = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      limit: 50,
      offset: offset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        setJobs([...allJobs, ...data.jdList]);
        setAllJobs((prevJobs) => [...prevJobs, ...data.jdList]);
        setOffset((prevOffset) => prevOffset + 9);

        if (data.jdList.length === 0) {
          setHasMore(false);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const filteredJobs = filterJobs(allJobs, filters);
    setJobs(filteredJobs);
  }, [allJobs, filters]);

  return (
    <div className="App">
      <Filters />
      <InfiniteScroll
        dataLength={jobs.length}
        next={fetchJobs}
        hasMore={hasMore}
        loader={
          <Box display="flex" justifyContent="center" mt={2} minHeight="80px">
            <CircularProgress />
          </Box>
        }
        endMessage={
          <Box textAlign="center" mt={2}>
            <p>No more jobs to load</p>
          </Box>
        }
        scrollThreshold={0.9}
      >
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "space-around", padding: 2 }}
        >
          {jobs.map((job, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <JobCard jobData={job} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
}

export default App;
