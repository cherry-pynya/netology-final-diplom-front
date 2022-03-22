import { useContext, useState } from "react";
import Popup from "../Popup";
import AdminContext from "../../../../../contex/Admin/AdminContext";
import close from '../../../../../asets/admin/close.png';
import { useEffect } from "react";

export default function MovieAdd() {
    const { movieAddPopup, setMovieAddPopup } = useContext(AdminContext);

    return (
        <Popup active={movieAddPopup} setActive={setMovieAddPopup}>
            <MovieAddContent setMovieAddPopup={setMovieAddPopup} />
        </Popup>
    );
}

function MovieAddContent({setMovieAddPopup}) {
  const init = {
    name: '',
    length: '',
    desc: '',
  }
  const { movies, addMovie } = useContext(AdminContext);
  const [form, setForm] = useState(init);

  const cancel = (e) => {
    e.preventDefault();
    setMovieAddPopup(false);
  };

  const submit = (e) => {
    e.preventDefault();
    const {name, length, desc} = form;
    if (name !== '' && length !== '') {
      if (movies.filter((el) => el.name === name).length !== 0) return false;
      addMovie( name, length, desc );
      setForm(init);
      setMovieAddPopup(false);
    };
  };

  useEffect(() => {
    setForm(init);
  }, []);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setForm((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="popup__content">
      <div className="popup__header">
        <h2 className="popup__title">
          Добавление фильма
          <button className="popup__dismiss" style={{border: 'none', outline: 'none', backgroundColor: 'transparent'}} onClick={cancel}>
            <img src={close} alt="Закрыть" />
          </button>
        </h2>
      </div>
      <div className="popup__wrapper">
        <form action="add_movie" method="post" acceptCharset="utf-8">
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
            Название фильма
            <input
              className="conf-step__input"
              type="text"
              placeholder="Например, &laquo;Гражданин Кейн&raquo;"
              name="name"
              onChange={handleChange}
              value={form.name}
            />
          </label>
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="desc">
            Описание фильма
            <input
              className="conf-step__input"
              type="text"
              placeholder="Например, &laquo;Шла Саша по шоссе и сосала сушку...&raquo;"
              name="desc"
              onChange={handleChange}
              value={form.desc}
            />
          </label>
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="length">
            Длинна фильма в минутах
            <input
              className="conf-step__input"
              type="number"
              placeholder="0"
              name="length"
              onChange={handleChange}
              value={form.length}
            />
          </label>
          <div className="conf-step__buttons text-center">
            <input
              type="submit"
              value="Добавить фильм"
              className="conf-step__button conf-step__button-accent"
              onClick={submit}
            />
            <button className="conf-step__button conf-step__button-regular" onClick={cancel} type="cancel">
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
