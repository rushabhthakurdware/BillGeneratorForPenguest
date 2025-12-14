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

  // --- UI HELPER FUNCTIONS ---
  // Helper to format camelCase keys to "Normal Title"
  const formatLabel = (key) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  // Helper to determine input type for better UX
  const getInputType = (key) => {
    if (key.toLowerCase().includes("date")) return "date";
    if (key.toLowerCase().includes("reading") || key.includes("Fee")) return "number";
    return "text";
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Penguest Utilities</h1>
          <p style={styles.subtitle}>Electricity Bill Generator</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.formGrid}>
          {/* Manually mapping for better layout control, or use loop with grid logic */}
          {Object.keys(formData).map((key) => (
            <div 
              key={key} 
              style={
                // Make name and meter number full width, others half width
                ['name', 'meterNo', 'pendingFee'].includes(key) 
                  ? styles.fullWidthField 
                  : styles.fieldContainer
              }
            >
              <label style={styles.label}>{formatLabel(key)}</label>
              <input
                style={styles.input}
                name={key}
                type={getInputType(key)}
                value={formData[key]}
                onChange={handleChange}
                placeholder={`Enter ${formatLabel(key)}`}
                required={key !== "pendingFee"}
              />
            </div>
          ))}

          <button type="submit" style={styles.submitButton}>
            Generate Bill
          </button>
        </form>
      </div>

      {bill && (
        <div style={styles.resultContainer}>
          {/* Bill Section (Receipt Style) */}
          <div id="bill-section" style={styles.billReceipt}>
            <div style={styles.receiptHeader}>
              <h2 style={{ margin: 0 }}>Penguest Utilities</h2>
              <span style={{ fontSize: "12px", color: "#666" }}>OFFICIAL RECEIPT</span>
            </div>
            
            <div style={styles.dashedLine}></div>

            <div style={styles.receiptRow}>
              <span>Customer:</span>
              <strong>{bill.name}</strong>
            </div>
            <div style={styles.receiptRow}>
              <span>Meter No:</span>
              <strong>{bill.meterNo}</strong>
            </div>

            <div style={styles.dashedLine}></div>

            <div style={styles.readingGrid}>
              <div style={{ textAlign: "left" }}>
                <span style={styles.subLabel}>Previous</span><br/>
                <strong>{bill.previousReading}</strong> <small>({bill.previousDate})</small>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={styles.subLabel}>Current</span><br/>
                <strong>{bill.currentReading}</strong> <small>({bill.currentDate})</small>
              </div>
            </div>

            <div style={styles.dashedLine}></div>

            <div style={styles.receiptRow}>
              <span>Units Consumed:</span>
              <span>{bill.units} kWh</span>
            </div>
            <div style={styles.receiptRow}>
              <span>Pending Fee:</span>
              <span>₹{bill.pendingFee}</span>
            </div>

            <div style={styles.totalRow}>
              <span>TOTAL DUE</span>
              <span>₹{bill.totalBill}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={styles.actionButtons}>
            <button onClick={downloadPDF} style={{ ...styles.actionBtn, backgroundColor: "#dc3545" }}>
              Download PDF
            </button>
            <button onClick={downloadPNG} style={{ ...styles.actionBtn, backgroundColor: "#007bff" }}>
              Download PNG
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Internal CSS-in-JS Styles object for cleaner JSX
const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    width: "100%",
    maxWidth: "600px",
    marginBottom: "30px",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    color: "#203a10",
    margin: "0 0 5px 0",
    fontSize: "24px",
    fontWeight: "700",
  },
  subtitle: {
    color: "#6b7280",
    margin: 0,
    fontSize: "14px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr", // Two columns
    gap: "15px",
  },
  fullWidthField: {
    gridColumn: "span 2",
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "5px",
    textTransform: "capitalize",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
    width: "100%",
    boxSizing: "border-box",
  },
  submitButton: {
    gridColumn: "span 2",
    backgroundColor: "#203a10",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "16px",
    transition: "opacity 0.2s",
  },
  // Result Area
  resultContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  billReceipt: {
    width: "380px",
    backgroundColor: "#fff",
    padding: "25px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    color: "#1f2937",
    fontFamily: "'Courier New', Courier, monospace", // Receipt font
  },
  receiptHeader: {
    textAlign: "center",
    marginBottom: "15px",
  },
  dashedLine: {
    borderBottom: "2px dashed #e5e7eb",
    margin: "15px 0",
  },
  receiptRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "14px",
  },
  readingGrid: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#f9fafb",
    padding: "10px",
    borderRadius: "4px",
  },
  subLabel: {
    fontSize: "11px",
    color: "#6b7280",
    textTransform: "uppercase",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    paddingTop: "10px",
    borderTop: "2px solid #000",
    fontWeight: "bold",
    fontSize: "18px",
  },
  actionButtons: {
    display: "flex",
    gap: "10px",
  },
  actionBtn: {
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
  },
};

export default BillForm;