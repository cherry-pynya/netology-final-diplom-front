import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./contex/Auth/AuthProvider";
import GuestMain from "./components/Guest/GuestMain/GuestMain";
import GuestProvider from "./contex/Guest/GuestProvider";
import AdminMain from "./components/Admin/AdminMain/AdminMain";
import AdminProvider from "./contex/Admin/AdminProvider";
import HallAdd from "./components/Admin/Cabinet/Popup/HallAdd/HallAdd";
import MovieAdd from "./components/Admin/Cabinet/Popup/MovieAdd/MovieAdd";
import ShowTimeAdd from "./components/Admin/Cabinet/Popup/ShowTimeAdd/ShowTimeAdd";

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
      <Router>
        <AdminProvider>
          <HallAdd />
          <MovieAdd />
          <ShowTimeAdd />
          <Routes>
            <Route path="/admin" element={<AdminMain />} />
          </Routes>
        </AdminProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
