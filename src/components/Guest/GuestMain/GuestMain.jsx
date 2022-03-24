import HomePage from "../HomePage/HomePage";
import '../../../css/client/styles.css';
import '../../../css/client/normalize.css'
import { useEffect, useContext } from "react";
import GuestContext from "../../../contex/Guest/GuestContext";
import Main from "../Main/Main";

export default function GuestMain() {
  const { pending, error, success, appStatus, getCustomerData } = useContext(GuestContext);
  useEffect(() => {
    getCustomerData();
    document.body.classList.remove();
    document.body.classList.add('guest-body');
  }, [])

  if (appStatus === success) return (
    <HomePage />
  );

  if (appStatus === pending) return (
    <Main>
      <div>
        <span>загрузка</span>
      </div>
    </Main>
  );

  if (appStatus === error) return (
    <Main>
      <div>
        <span>ошибка</span>
      </div>
    </Main>
  );
};
