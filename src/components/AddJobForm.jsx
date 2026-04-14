import { useState } from "react";
import API from "../services/api";

function AddJobForm({ onJobAdded }) {
  const [form, setForm] = useState({
    company: "",
    position: "",
    status: "Applied",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/jobs", form);
      setForm({ company: "", position: "", status: "Applied", notes: "" });
      onJobAdded(); // refresh list
    } catch (err) {
      alert("Error adding job");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        placeholder="Company"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />

      <input
        placeholder="Position"
        value={form.position}
        onChange={(e) => setForm({ ...form, position: e.target.value })}
      />

      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <input
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />

      <button type="submit">Add Job</button>
    </form>
  );
}

export default AddJobForm;