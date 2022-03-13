import "../../../css/admin/styles.css";
import "../../../css/admin/normalize.css";
import { useEffect } from "react";
import '../../../asets/admin/background.jpg'

export default function AdminMain() {
  useEffect(() => {
    document.body.classList.remove();
    document.body.classList.add('admin-body');
  }, [])
  return <div></div>;
}


const b = {
  backgroundImage: 'url("../../asets/admin/background.jpg")',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backgroundNlendMode: 'multiply',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  counterReset: 'num'
}