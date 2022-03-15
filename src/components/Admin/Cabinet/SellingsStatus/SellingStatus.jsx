import { useContext } from "react";
import { useState } from "react";
import AdminContext from "../../../../contex/Admin/AdminContext";
import PropTypes from "prop-types";
import { useEffect } from "react";
import poster from "../../../../asets/admin/poster.png";
import { nanoid } from "nanoid";

export default function SellingStatus() {
  const [closed, setClosed] = useState(false);

  const { sellingStatus, setSellingStatus } = useContext(AdminContext)

  const close = () => {
    setClosed(!closed);
  };

  return (
    <section className="conf-step">
      <header 
      onClick={close}
      className={
          !closed ? "conf-step__header conf-step__header_opened"
          : "conf-step__header conf-step__header_closed"
      }>
        <h2 className="conf-step__title">Открыть продажи</h2>
      </header>
      <div className="conf-step__wrapper text-center">
        <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
        <button className="conf-step__button conf-step__button-accent">
          {sellingStatus ? 'Открыть продажу билетов' : "Закрыть продажу билетов"}
        </button>
      </div>
    </section>
  );
}
