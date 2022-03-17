import { useContext } from "react";
import { useState } from "react";
import AdminContext from "../../../../contex/Admin/AdminContext";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { useEffect } from "react";

export default function PriceConfig() {
  const init = {
    vipPrice: 0,
    price: 0,
  };
  const { halls, setHalls, saveHallConfig } = useContext(AdminContext);
  const [closed, setClosed] = useState(false);
  const [hall, setHall] = useState(null);
  const [form, setForm] = useState(init);
  const [backup, setBackup] = useState([]);

  const close = () => {
    setClosed(!closed);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({
      [name]: value,
    });
    halls.forEach((el) => {
        if (el._id === hall) {
            el[name] = value;
        }
    });
  };

  useEffect(() => {
    if (halls.length > 0) {
      const arr = [];
      for (let i = 0; i < halls.length; i++) {
        arr.push({ ...halls[i] });
      };
      setBackup(arr);
      setHall(halls[0]._id);
      setForm({
        vipPrice: halls[0].vipPrice,
        price: halls[0].price,
      });
    }
  }, []);

  const pickHall = (_id) => {
    setHall(_id);
    const item = halls.find((el) => el._id === _id);
    const { price, vipPrice } = item;
    setForm({
        price, vipPrice
    });
  };

  const cancel = () => {
    setForm(init);
    setHalls(backup);
  };

  const submit = (e) => {
    e.preventDefault();
    saveHallConfig(halls);
  };

  if (halls.length === 0)
    return (
      <section className="conf-step">
        <header
          className={
            !closed
              ? "conf-step__header conf-step__header_opened"
              : "conf-step__header conf-step__header_closed"
          }
          onClick={close}
        >
          <h2 className="conf-step__title">Конфигурация цен</h2>
        </header>
        <div className="conf-step__wrapper">
          <p className="conf-step__paragraph">Сначала создайте зал!</p>
        </div>
      </section>
    );

  return (
    <section className="conf-step">
      <header
        className={
          !closed
            ? "conf-step__header conf-step__header_opened"
            : "conf-step__header conf-step__header_closed"
        }
        onClick={close}
      >
        <h2 className="conf-step__title">Конфигурация цен</h2>
      </header>
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
        <ul className="conf-step__selectors-box">
          {halls.map((item) => (
            <Hall item={item} hall={hall} pickHall={pickHall} key={nanoid()} />
          ))}
        </ul>
        <p className="conf-step__paragraph">
          Установите цены для типов кресел:
        </p>
        <div className="conf-step__legend">
          <label className="conf-step__label">
            Цена, рублей
            <input
              type="number"
              className="conf-step__input"
              placeholder="0"
              value={form.price}
              name="price"
              minLength={0}
              onChange={handleChange}
            />
          </label>
          за{" "}
          <span className="conf-step__chair conf-step__chair_standart"></span>{" "}
          обычные кресла
        </div>
        <div className="conf-step__legend">
          <label className="conf-step__label">
            Цена, рублей
            <input
              type="number"
              className="conf-step__input"
              placeholder="0"
              value={form.vipPrice}
              name="vipPrice"
              onChange={handleChange}
            />
          </label>
          за <span className="conf-step__chair conf-step__chair_vip"></span> VIP
          кресла
        </div>

        <fieldset className="conf-step__buttons text-center">
          <button className="conf-step__button conf-step__button-regular" onClick={cancel}>
            Отмена
          </button>
          <input
            type="submit"
            value="Сохранить"
            className="conf-step__button conf-step__button-accent"
            onClick={submit}
          />
        </fieldset>
      </div>
    </section>
  );
}

PriceConfig.propTypes = {
  halls: PropTypes.array,
};

function Hall({ item, hall, pickHall }) {
  const { number, _id } = item;
  const check = _id === hall;
  const click = () => {
    pickHall(_id);
  };
  return (
    <li>
      <input
        type="radio"
        className="conf-step__radio"
        name="prices-hall"
        value={`Зал ${number}`}
        checked={check}
        onChange={click}
      />
      <span className="conf-step__selector">{`Зал ${number}`}</span>
    </li>
  );
}

Hall.propTypes = {
  hall: PropTypes.number,
  item: PropTypes.object,
  pickHall: PropTypes.func,
};
