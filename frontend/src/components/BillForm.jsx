import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function BillForm() {
  const [formData, setFormData] = useState({
    name: "",
    meterNo: "",
    previousReading: "",
    previousDate: "",
    currentReading: "",
    currentDate: "",
    pendingFee: 0,
  });

  const [bill, setBill] = useState(null);

  // Update form state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert number fields to actual numbers
    const payload = {
      ...formData,
      previousReading: parseFloat(formData.previousReading),
      currentReading: parseFloat(formData.currentReading),
      pendingFee: parseFloat(formData.pendingFee) || 0,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/bills/generate",
        payload
      );
      console.log(res.data); // check backend response
      setBill(res.data);
    } catch (error) {
      console.error("Error generating bill:", error);
    }
  };

  // Generate PDF
  const downloadPDF = () => {
    if (!bill) return;
    const input = document.getElementById("bill-section");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${bill.name}_LightBill.pdf`);
    });
  };

  // Generate PNG
  const downloadPNG = () => {
    if (!bill) return;
    const input = document.getElementById("bill-section");
    html2canvas(input).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${bill.name}_LightBill.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div  style={{ padding: "20px", maxWidth: "600px", margin: "auto",align:"center", backgroundColor: "#e6e2e2ff", color: "black", borderRadius: "8px" }}>

        <h1 style={{ textAlign: "center", color: "black" }}>Generate Penguest Light Bill</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} style={{ marginBottom: "8px" }}>
            <label style={{ textTransform: "capitalize" }}>{key}: </label>
            <input
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required={key !== "pendingFee"}

            />
          </div>
        ))}
        <button type="submit" style={{ backgroundColor: "#203a10ff", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer",marginLeft: "200px",marginTop: "50px" }}>Generate Bill</button>
      </form>

      {bill && (
        <div>
          <div
            id="bill-section"
            style={{
              marginTop: "30px",
              border: "1px solid black",
              padding: "20px",
              width: "400px",
              backgroundColor: "white",
              color: "black",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Penguest Light Bill</h2>
            <hr />
            <p><b>Name:</b> {bill.name}</p>
            <p><b>Meter No:</b> {bill.meterNo}</p>
            <p>
              <b>Previous Reading:</b> {bill.previousReading} ({bill.previousDate})
            </p>
            <p>
              <b>Current Reading:</b> {bill.currentReading} ({bill.currentDate})
            </p>
            <p><b>Pending Fee:</b> ₹{bill.pendingFee}</p>
            <p><b>Units Consumed:</b> {bill.units}</p>
            <h3><b>Total Bill:</b> ₹{bill.totalBill}</h3>
          </div>

          <div style={{ marginTop: "15px" }}>
            <button onClick={downloadPDF}>Download as PDF</button>
            <button onClick={downloadPNG} style={{ marginLeft: "10px" }}>
              Download as PNG
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BillForm;

