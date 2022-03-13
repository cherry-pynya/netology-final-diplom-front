import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./contex/Auth/AuthProvider";
import GuestMain from "./components/Guest/GuestMain/GuestMain";
import GuestProvider from "./contex/Guest/GuestProvider";
import AdminMain from "./components/Admin/AdminMain/AdminMain";
import AdminProvider from "./contex/Admin/AdminProvider";

function App() {
  return (
    <AuthProvider>
      <GuestProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<GuestMain />} />
          </Routes>
        </Router>
      </GuestProvider>
      <AdminProvider>
        <Router>
          <Routes>
            <Route path="/admin" element={<AdminMain />} />
          </Routes>
        </Router>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;
