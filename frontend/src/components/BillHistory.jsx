
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function BillHistory() {
//   const [bills, setBills] = useState([]);
//   const [sortBy, setSortBy] = useState(""); // new state for sorting
//   const [searchQuery, setSearchQuery] = useState(""); // new state for search
//   const navigate = useNavigate();

//   // Refetch or sort whenever sortBy changes
//   useEffect(() => {
//     if (sortBy) {
//       const sortedBills = [...bills].sort((a, b) => {
//         if (a[sortBy] < b[sortBy]) return -1;
//         if (a[sortBy] > b[sortBy]) return 1;
//         return 0;
//       });
//       setBills(sortedBills);
//     }
//   }, [sortBy]);

//   useEffect(() => {
//     const fetchBills = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/bills");
//         setBills(res.data);
//       } catch (err) {
//         console.error("Error fetching bills:", err);
//       }
//     };

//     fetchBills();
//   }, []);




//   const handleDelete = async (billId) => {
//     if (!window.confirm("Are you sure you want to delete this bill?")) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/bills/${billId}`);
//       setBills(bills.filter((bill) => bill._id !== billId));
//     } catch (error) {
//       console.error("Error deleting bill:", error);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
//       <h2>All Generated Bills</h2>
//       <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
//         Back
//       </button>
//       <div style={{ marginBottom: "15px" }}>
//         <label>Sort by: </label>
//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//           <option value="">--None--</option>
//           <option value="name">Name</option>
//           <option value="meterNo">Meter No.</option>
//         </select>
//       </div>

//       {bills.length === 0 ? (
//         <p>No bills generated yet.</p>
//       ) : (
//         bills.map((bill) => (
//           <div
//             key={bill._id}
//             style={{
//               border: "1px solid black",
//               padding: "15px",
//               marginBottom: "10px",
//               borderRadius: "6px",
//             }}
//           >
//             <p><b>Penguest ID / Name:</b> {bill.penguestId || bill.name}</p>
//             <p>
//               <b>Previous Reading:</b> {bill.previousReading} ({bill.previousDate})
//             </p>
//             <p>
//               <b>Current Reading:</b> {bill.currentReading} ({bill.currentDate})
//             </p>
//             <p><b>Units:</b> {bill.units}</p>
//             <p><b>Pending Fee:</b> ₹{bill.pendingFee}</p>
//             <p><b>Total Bill:</b> ₹{bill.totalBill}</p>
//             <p><b>Generated on:</b> {bill.currentDate}</p>

//             <button onClick={() => handleDelete(bill._id)}>Delete</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default BillHistory;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BillHistory() {
  const [bills, setBills] = useState([]);
  const [sortBy, setSortBy] = useState(""); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bills");
        setBills(res.data);
      } catch (err) {
        console.error("Error fetching bills:", err);
      }
    };
    fetchBills();
  }, []);

  // Delete a bill
  const handleDelete = async (billId) => {
    if (!window.confirm("Are you sure you want to delete this bill?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/bills/${billId}`);
      setBills(bills.filter((bill) => bill._id !== billId));
    } catch (error) {
      console.error("Error deleting bill:", error);
    }
  };

  // Filter and sort bills
  const getFilteredBills = () => {
    let filtered = [...bills];

    // Search
    if (searchQuery) {
      filtered = filtered.filter(
        (bill) =>
          (bill.name && bill.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (bill.meterNo && bill.meterNo.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort
    if (sortBy) {
      filtered.sort((a, b) => {
        if (!a[sortBy]) return 1;
        if (!b[sortBy]) return -1;
        return a[sortBy].localeCompare(b[sortBy]);
      });
    }

    return filtered;
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px",backgroundColor: "#ff9d00ff", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Back
      </button>
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>All Generated Bills</h2>
      

      {/* Search */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search by Name or Meter No."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "5px", width: "250px" }}
        />
      </div>

      {/* Sorting */}
      <div style={{ marginBottom: "15px" }}>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">--None--</option>
          <option value="name">Name</option>
          <option value="meterNo">Meter No.</option>
        </select>
      </div>

      {getFilteredBills().length === 0 ? (
        <p>No bills found.</p>
      ) : (
        getFilteredBills().map((bill) => (
          <div
            key={bill._id}
            style={{
              border: "3px solid black",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "6px",
              backgroundColor: "#d6d1d1ff",color: "black"

            }}
          >
            <p><b>Penguest ID / Name:</b> {bill.penguestId || bill.name}</p>
            <p>
              <b>Previous Reading:</b> {bill.previousReading} ({bill.previousDate})
            </p>
            <p>
              <b>Current Reading:</b> {bill.currentReading} ({bill.currentDate})
            </p>
            <p><b>Meter No:</b> {bill.meterNo}</p>
            <p><b>Units:</b> {bill.units}</p>
            <p><b>Pending Fee:</b> ₹{bill.pendingFee}</p>
            <p><b>Total Bill:</b> ₹{bill.totalBill}</p>
            <p><b>Generated on:</b> {bill.currentDate}</p>
            <button onClick={() => handleDelete(bill._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
    </div>
  );
}

export default BillHistory;
