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

import moment from "moment";

function App() {
  moment.locale('ru')
  console.log(moment('28:03:2022 19:00', "DD MM YYYY hh:mm"))
  return (
    <GuestProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<GuestMain />} />
        </Routes>
      </Router>
      <Router>
        <AdminProvider>
          <ShowTimeDelte />
          <HallAdd />
          <MovieAdd />
          <ShowTimeAdd />
          <Routes>
            <Route path="/admin" element={<AdminMain />} />
          </Routes>
        </AdminProvider>
      </Router>
    </GuestProvider>
  );
}

export default App;
