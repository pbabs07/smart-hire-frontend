import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import AddJobForm from "../components/AddJobForm";
import JobCard from "../components/JobCard";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchJobs = async () => {
    const res = await API.get("/jobs");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs =
    filter === "All"
      ? jobs
      : jobs.filter(job => job.status === filter);

  return (
    <div style={{ display: "flex" }}>
      
      {/* SIDEBAR */}
      <Sidebar setFilter={setFilter} />

      {/* MAIN CONTENT */}
      <div style={{
        marginLeft: "300px",
        padding: "20px",
        width: "100%"
      }}>

        <h1 >Job Dashboard</h1>

        <AddJobForm onJobAdded={fetchJobs} />

        <div style={{ display: "grid", gap: "15px",}}>
          {filteredJobs.map(job => (
            <JobCard key={job._id} job={job} refresh={fetchJobs} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;