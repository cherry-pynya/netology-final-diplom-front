import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import PaymentPage from "../PaymentPage/PaymentPage";

export default function GuestMain() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='payment' element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}
