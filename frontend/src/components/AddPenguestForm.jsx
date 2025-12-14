import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddPenguestForm({ onPenguestAdded }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    background: "",
    jobDetails: "",
    aadharNumber: "",
    phoneNumber: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${API_BASE_URL}/api/penguests`, formData);
      setMessage("Penguest added successfully ✅");
      setFormData({
        name: "",
        background: "",
        jobDetails: "",
        aadharNumber: "",
        phoneNumber: "",
      });
      if (onPenguestAdded) onPenguestAdded(res.data); // notify parent
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error adding penguest ❌");
      }
    }
  };

  return (

    
    <div>

         {/* Back Button */}
      <button style={{  backgroundColor: "#ff0037ff", color: "white", padding: "10px 20px", border: "solid", borderRadius: "5px", cursor: "pointer", marginLeft: "10px" }} onClick={() => navigate("/")}>
        Back
      </button>
      <div style={{ padding: "20px", maxWidth: "500px", margin: "auto",align:"center", backgroundColor: "#e6e2e2ff", borderRadius: "8px",color: "black" }}>
      <h1 style={{ textAlign: "center" }}>Add New Penguest</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ backgroundColor: "#4e4b4bff",marginLeft: "100px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Background:</label>
          <input
            type="text"
            name="background"
            value={formData.background}
            onChange={handleChange}
            style={{ backgroundColor: "#4e4b4bff",marginLeft: "60px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Job Details:</label>
          <input
            type="text"
            name="jobDetails"
            value={formData.jobDetails}
            onChange={handleChange}
            style={{ backgroundColor: "#4e4b4bff",marginLeft: "70px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Aadhar Number:</label>
          <input
            type="text"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
            required
            style={{ backgroundColor: "#4e4b4bff",marginLeft: "35px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            style={{ backgroundColor: "#4e4b4bff",marginLeft: "40px" }}
          />
        </div>
        <button type="submit" style={{ backgroundColor: "#203a10ff", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer",marginLeft: "200px",marginTop: "50px" }}>Add Penguest</button>
      </form>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}

     
    </div>
    </div>
  );
}

export default AddPenguestForm;
