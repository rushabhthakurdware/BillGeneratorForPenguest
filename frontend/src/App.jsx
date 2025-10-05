import React from "react";
import BillForm from "./components/BillForm";
import AddPenguestForm from "./components/AddPenguestForm";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PenguestList from "./components/PenguestList";
import BillHistory from "./components/BillHistory";
function App() {
  return (
        <Router>
      <div style={{ padding: "10px" }}>
        {/* Top navigation */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <Link to="/add-penguest">
            <button style={{ backgroundColor: "#ff9d00ff", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Add New Penguest</button>
          </Link>

          <Link to="/view-penguests">
            <button style={{ backgroundColor: "#ff9d00ff", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", display: "block", marginLeft: "10px" }}>View Penguests</button>
          </Link>
          
          <Link to="/bill-history">
            <button style={{ backgroundColor: "#ff9d00ff", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", display: "block", marginLeft: "10px" }}>View Bill History</button>
          </Link>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<BillForm />} />
          <Route path="/add-penguest" element={<AddPenguestForm />} />
          <Route path="/view-penguests" element={<PenguestList />} />
          <Route path="/bill-history" element={<BillHistory />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
