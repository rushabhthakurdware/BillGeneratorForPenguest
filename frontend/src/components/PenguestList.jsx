import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

function PenguestList() {
  const navigate = useNavigate();
  const [penguests, setPenguests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPenguests = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/penguests`);
        setPenguests(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching penguests:", error);
        setLoading(false);
      }
    };
    fetchPenguests();
  }, []);

  if (loading) return <p>Loading penguests...</p>;

  return (
    <div>
      <button style={{  backgroundColor: "#ff0037ff", color: "white", padding: "10px 20px", border: "solid", borderRadius: "5px", cursor: "pointer", marginLeft: "10px" }} onClick={() => navigate("/")}>
        Back
      </button>
      <h1 style={{ textAlign: "center" }}>Penguest List</h1>
      {penguests.length === 0 ? (
        <p>No penguests added yet.</p>
      ) : (
        <table border="3" cellPadding="8" style={{backgroundColor: "#fbf8f8ff",color: "black", borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Background</th>
              <th>Job Details</th>
              <th>Aadhar Number</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {penguests.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.background}</td>
                <td>{p.jobDetails}</td>
                <td>{p.aadharNumber}</td>
                <td>{p.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PenguestList;
