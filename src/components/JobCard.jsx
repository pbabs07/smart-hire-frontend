import API from "../services/api";

function JobCard({ job, refresh }) {
  const statusColors = {
    Applied: "#dbeafe", 
    Interview: "#fef3c7",
    Offer: "#dcfce7",
    Rejected: "#fee2e2"
  };
  const handleDelete = async () => {
    await API.delete(`/jobs/${job._id}`);
    refresh();
  };

  const handleStatusChange = async (e) => {
    await API.put(`/jobs/${job._id}`, {
      status: e.target.value,
    });
    refresh();
  };

  return (
    <div className="job-card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3>{job.company}</h3>
          <p className="position-text">{job.position}</p>
        </div>
        <span className="status-badge" style={{ background: statusColors[job.status] }}>
          {job.status}
        </span>
      </div>

      <p className="notes">{job.notes}</p>

      <div className="card-actions">
        <select value={job.status} onChange={handleStatusChange} className="status-select">
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <button onClick={handleDelete} className="delete-link">Delete</button>
      </div>

      <style>{`
        .job-card {
          background: white; padding: 20px; border-radius: 12px;
          border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        }
        .position-text { color: var(--text-muted); margin-top: -10px; }
        .status-badge { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; height: fit-content;}
        .notes { font-size: 14px; color: #475569; margin: 15px 0; }
        .card-actions { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; pt: 15px; }
        .delete-link { background: none; color: var(--danger); font-size: 13px; }
        .status-select { font-size: 12px; padding: 5px; }
      `}</style>
    </div>
  );
}

export default JobCard;