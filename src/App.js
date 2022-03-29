import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GuestMain from "./components/Guest/GuestMain/GuestMain";
import GuestProvider from "./contex/Guest/GuestProvider";
import AdminMain from "./components/Admin/AdminMain/AdminMain";
import AdminProvider from "./contex/Admin/AdminProvider";
import HallAdd from "./components/Admin/Cabinet/Popup/HallAdd/HallAdd";
import MovieAdd from "./components/Admin/Cabinet/Popup/MovieAdd/MovieAdd";
import ShowTimeAdd from "./components/Admin/Cabinet/Popup/ShowTimeAdd/ShowTimeAdd";
import ShowTimeDelte from "./components/Admin/Cabinet/Popup/ShowTimeDelete/ShowTimeDelete";
import Hall from "./components/Guest/Hall/Hall";
import PaymentPage from "./components/Guest/PaymentPage/PaymentPage";

function App() {
  return (
    <Router>
      <GuestProvider>
        <Routes>
          <Route exact path="/" element={<GuestMain />} />
        </Routes>
        <Routes>
          <Route path="/showTime/:id" element={<Hall />} />
        </Routes>
        <Routes>
          <Route path="/payment/:id" element={<PaymentPage />} />
        </Routes>
        <AdminProvider>
          <ShowTimeDelte />
          <HallAdd />
          <MovieAdd />
          <ShowTimeAdd />
          <Routes>
            <Route path="/admin" element={<AdminMain />} />
          </Routes>
        </AdminProvider>
      </GuestProvider>
    </Router>
  );
}

export default App;
