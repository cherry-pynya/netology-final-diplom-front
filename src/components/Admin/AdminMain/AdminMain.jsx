import "../../../css/admin/styles.css";
import "../../../css/admin/normalize.css";
import { useEffect } from "react";
import '../../../asets/admin/background.jpg'
import Main from "../../Guest/Main/Main";
import AdminHeader from '../AdminHeader/AdminHeader';
import HallManager from "../Cabinet/HallManager/HallManager";
import HallConfig from "../Cabinet/HallConfig/HallConfig";

export default function AdminMain() {
  useEffect(() => {
    document.body.classList.remove();
    document.body.classList.add('admin-body');
  }, [])
  return (
    <Main>
      <AdminHeader />
      <HallManager />
      <HallConfig />
    </Main>
  );
};
