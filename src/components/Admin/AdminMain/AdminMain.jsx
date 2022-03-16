import { useContext } from "react";
import AdminContext from "../../../contex/Admin/AdminContext";
import "../../../css/admin/styles.css";
import "../../../css/admin/normalize.css";
import { useEffect } from "react";
import "../../../asets/admin/background.jpg";
import Main from "../../Guest/Main/Main";
import AdminHeader from "../AdminHeader/AdminHeader";
import HallManager from "../Cabinet/HallManager/HallManager";
import HallConfig from "../Cabinet/HallConfig/HallConfig";
import PriceConfig from "../Cabinet/PriceConfig/PriceCongig";
import MovieConfig from "../Cabinet/MovieConfig/MovieConfig";
import SellingStatus from "../Cabinet/SellingsStatus/SellingStatus";
import Login from "../Login/Login";

export default function AdminMain() {
  const { appStatus, pending, error, success, login } =
    useContext(AdminContext);

  useEffect(() => {
    document.body.classList.remove();
    document.body.classList.add("admin-body");
  }, []);

  if (appStatus === success) {
    if (login)
      return (
        <Main>
          <AdminHeader />
          <HallManager />
          <HallConfig />
          <PriceConfig />
          <MovieConfig />
          <SellingStatus />
        </Main>
      );
    if (!login)
      return (
        <Main>
          <AdminHeader />
          <Login />
        </Main>
      );
  }

  if (appStatus === error)
    return (
      <Main>
        <AdminHeader />
        <span>ошибка</span>
      </Main>
    );

  if (appStatus === pending)
    return (
      <Main>
        <AdminHeader />
        <span>загрузка</span>
      </Main>
    );
}
