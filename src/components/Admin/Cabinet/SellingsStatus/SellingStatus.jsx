import { useContext } from "react";
import { useState } from "react";
import PropTypes from 'prop-types';
import AdminContext from "../../../../contex/Admin/AdminContext";

export default function SellingStatus() {
  const [closed, setClosed] = useState(false);

  const { sellingStatus, changeSellingStatus } = useContext(AdminContext);

  const close = () => {
    setClosed(!closed);
  };

  const click = () => {
    changeSellingStatus(!sellingStatus);
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
        <button className="conf-step__button conf-step__button-accent" onClick={click}>
          {!sellingStatus ? 'Открыть продажу билетов' : "Закрыть продажу билетов"}
        </button>
      </div>
    </section>
  );
};

SellingStatus.propTypes = {
  sellingStatus: PropTypes.bool,
  changeSellingStatus: PropTypes.func,
};
