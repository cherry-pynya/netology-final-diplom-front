import { useContext } from "react";
import { useState } from "react";
import AdminContext from "../../../../contex/Admin/AdminContext";
import PropTypes from 'prop-types';
import { nanoid } from "nanoid";

export default function HallManager() {
  const { halls } = useContext(AdminContext);
  const [closed, setClosed] = useState(false);
  const { hallAddPopup, setHallAddPopup } = useContext(AdminContext);

  const toggle = () => {
    setClosed(!closed);
  };

  const click = () => {
    setHallAddPopup(!hallAddPopup);
  };
  
  return (
    <section className="conf-step">
      <header className={
          !closed ? 'conf-step__header conf-step__header_opened'
          : 'conf-step__header conf-step__header_closed'
      } onClick={toggle}>
        <h2 className="conf-step__title">Управление залами</h2>
      </header>
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">Доступные залы:</p>
        <ul className="conf-step__list">
            {halls.map((el) => <Hall obj={el} key={nanoid()} />)}
        </ul>
        <button className="conf-step__button conf-step__button-accent" onClick={click}>
          Создать зал
        </button>
      </div>
    </section>
  );
}

HallManager.propTypes = {
  halls: PropTypes.object,
}

function Hall({ obj }) {
  const { deleteHall } = useContext(AdminContext);
  const { number, _id } = obj;
  return (
    <li>
      {`Зал ${number}`}
      <button className="conf-step__button conf-step__button-trash" onClick={() => deleteHall(_id)}></button>
    </li>
  );
}

Hall.propTypes = {
  obj: PropTypes.object,
}
