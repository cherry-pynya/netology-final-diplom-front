import { useContext, useState } from "react";
import PropTypes from 'prop-types';
import Popup from "../Popup";
import AdminContext from "../../../../../contex/Admin/AdminContext";
import close from "../../../../../asets/admin/close.png";
import { nanoid } from "nanoid";
import giveMeTheShow from "../../../../../utils/giveMeTheShow";
import checkTimeFit from "../../../../../utils/checkTimeFit";

export default function ShowTimeAdd() {
  const { showtimeAddPopup, setshowtimeAddPopup } = useContext(AdminContext);

  return (
    <Popup active={showtimeAddPopup} setActive={setshowtimeAddPopup}>
      <ShowTimeAddContent setshowtimeAddPopup={setshowtimeAddPopup} />
    </Popup>
  );
};

ShowTimeAdd.propTypes = {
    showtimeAddPopup: PropTypes.bool,
    setshowtimeAddPopup: PropTypes.func
};

function ShowTimeAddContent({ setshowtimeAddPopup }) {
  const { movies, halls, setShowTimes, showTimes } = useContext(AdminContext);
  const init = {
    hall: "",
    time: "00:00",
    movie: "",
  };
  const [form, setForm] = useState(init);

  const cancel = (e) => {
    e.preventDefault();
    setForm(init);
    setshowtimeAddPopup(false);
  };

  const submit = (e) => {
    e.preventDefault();
    const { hall, movie, time } = form;
    if (hall !== "" && movie !== "") {
      const st = showTimes.filter((el) => el.hall === hall);
      if (!checkTimeFit(time, movies.find((el) => el._id === movie), st)) return false;
      const arr = giveMeTheShow(halls, movies, [form]);
      setShowTimes([...arr, ...showTimes]);
      setshowtimeAddPopup(false);
    }
    setForm(init);
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setForm((values) => ({ ...values, [name]: value }));
  };

  if (halls.length === 0 || movies.length === 0) {
    return (
      <div className="popup__content">
        <div className="popup__header">
          <h2 className="popup__title">
            Нет доступных варинтов создания сеансов!
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="popup__content">
      <div className="popup__header">
        <h2 className="popup__title">
          Добавление сеанса
          <button
            onClick={cancel}
            className="popup__dismiss"
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
            }}
          >
            <img src={close} alt="Закрыть" />
          </button>
        </h2>
      </div>
      <div className="popup__wrapper">
        <form action="add_movie" method="post" acceptCharset="utf-8">
          <label
            className="conf-step__label conf-step__label-fullsize"
            htmlFor="hall"
          >
            Название зала
            <select
              className="conf-step__input"
              name="hall"
              required
              onChange={handleChange}
              value={form.hall}
            >
              <Option key={nanoid()} _id={''} name='-' />
              {halls.map((el, index) => (
                <Option 
                  _id={el._id}
                  key={nanoid()}
                  name={`Зал ${el.number}`}
                />
              ))}
            </select>
          </label>
          <label
            className="conf-step__label conf-step__label-fullsize"
            htmlFor="name"
          >
            Время начала
            <input
              onChange={handleChange}
              className="conf-step__input"
              type="time"
              name="time"
              value={form.time}
              required
            />
          </label>

          <label
            className="conf-step__label conf-step__label-fullsize"
            htmlFor="name"
          >
            Фильм
            <select
              className="conf-step__input"
              name="movie"
              required
              onChange={handleChange}
              value={form.movie}
            >
              <Option key={nanoid()} _id={''} name='-' />
              {movies.map((el, index) => (
                <Option
                  _id={el._id}
                  key={nanoid()}
                  name={el.name}
                />
              ))}
            </select>
          </label>

          <div className="conf-step__buttons text-center">
            <input
              type="submit"
              value="Добавить"
              className="conf-step__button conf-step__button-accent"
              onClick={submit}
            />
            <button
              className="conf-step__button conf-step__button-regular"
              onClick={cancel}
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ShowTimeAdd.ShowTimeAddContent = {
    setshowtimeAddPopup: PropTypes.func,
    movies: PropTypes.array,
    halls: PropTypes.array,
    setShowTimes: PropTypes.array,
    showTimes: PropTypes.func,
};

function Option({ _id, name }) {
  return <option value={_id}>{name}</option>;
};

Option.ShowTimeAddContent = {
    name: PropTypes.string,
    _id: PropTypes.string,
};
