import HomePage from "../HomePage/HomePage";
import '../../../css/client/styles.css';
import '../../../css/client/normalize.css'
import { useEffect } from "react";

export default function GuestMain() {
  useEffect(() => {
    document.body.classList.remove();
    document.body.classList.add('guest-body');
  }, [])
  return (
    <HomePage />
  );
};
