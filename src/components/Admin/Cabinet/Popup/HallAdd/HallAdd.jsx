import Popup from "../Popup";
import { useContext } from "react";
import AdminContext from "../../../../../contex/Admin/AdminContext";
import close from '../../../../../asets/admin/close.png'
import { useState } from "react";
import PropTypes from 'prop-types';

export default function HallAdd() {
    const { hallAddPopup, setHallAddPopup } = useContext(AdminContext);
    return (
        <Popup active={hallAddPopup} setActive={setHallAddPopup}>
            <HallAddContent setHallAddPopup={setHallAddPopup} />
        </Popup>
    );
};

HallAdd.propTypes = {
    hallAddPopup: PropTypes.bool,
    setHallAddPopup: PropTypes.func,
};

function HallAddContent({setHallAddPopup}) {
  const { createHall } = useContext(AdminContext);

  const [form, setForm] = useState({
      number: '',
  });

  const submit = (e) => {
    e.preventDefault();
    const { number } = form;
    if (number > 0) {
        createHall(number);
    };
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setForm({
        number: value
    });
  };

  const resetForm = () => {
    setForm({
        number: ''
    });
  };

  const closePopup = () => {
    setHallAddPopup(false);
    resetForm();
  };


  return (
    <div className="popup__content">
      <div className="popup__header">
        <h2 className="popup__title">
          Добавление зала
          <button className="popup__dismiss" onClick={closePopup} style={{outline: 'none', border: 'none', backgroundColor: 'transparent'}}>
            <img src={close} alt="Закрыть" />
          </button>
        </h2>
      </div>
      <div className="popup__wrapper">
        <form action="add_hall" method="post" acceptCharset="utf-8">
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="number">
            Номер зала
            <input
              className="conf-step__input no-arrows"
              minLength={0}
              type="number"
              name="number"
              placeholder="Например, &laquo;1&raquo;"
              value={form.number}
              onChange={handleChange}
            />
          </label>
          <div className="conf-step__buttons text-center">
            <input
              type="submit"
              value="Добавить зал"
              className="conf-step__button conf-step__button-accent"
              onClick={submit}
            />
            <button className="conf-step__button conf-step__button-regular" onClick={closePopup}>
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

HallAddContent.propTypes = {
    setHallAddPopup: PropTypes.func,
};
