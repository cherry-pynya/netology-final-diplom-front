import { useContext } from "react";
import { useState } from "react";
import AdminContext from "../../../../contex/Admin/AdminContext";

export default function HallConfig() {
  const [closed, setClosed] = useState(false);
  const [hall, setHall] = useState(null);
  //const { halls } = useContext(AdminContext);


  useState(() => {
    if (halls.length > 0) {
      setHall(halls[0]);
    }
  }, []);

  const toggle = () => {
    setClosed(!closed);
  };

  const pickHall = (id) => {
    const item = halls.find((el) => el.id === id);
    setHall(item);
  }

  return (
    <section className="conf-step">
      <header
        className={
          !closed
            ? "conf-step__header conf-step__header_opened"
            : "conf-step__header conf-step__header_closed"
        }
        onClick={toggle}
      >
        <h2 className="conf-step__title">Конфигурация залов</h2>
      </header>
      {hall ? 
      <div className="conf-step__wrapper">
      <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
      <ul className="conf-step__selectors-box">
        {halls.map((el) => (
          <HallPicker item={el} pickHall={pickHall} hall={hall.id} key={el.id} />
        ))}
      </ul>
      <p className="conf-step__paragraph">
        Укажите количество рядов и максимальное количество кресел в ряду:
      </p>
      <div className="conf-step__legend">
        <label className="conf-step__label">
          Рядов, шт
          <input type="text" className="conf-step__input" placeholder="10" />
        </label>
        <span className="multiplier">x</span>
        <label className="conf-step__label">
          Мест, шт
          <input type="text" className="conf-step__input" placeholder="8" />
        </label>
      </div>
      <p className="conf-step__paragraph">
        Теперь вы можете указать типы кресел на схеме зала:
      </p>
      <div className="conf-step__legend">
        <span className="conf-step__chair conf-step__chair_standart"></span> —
        обычные кресла
        <span className="conf-step__chair conf-step__chair_vip"></span> — VIP
        кресла
        <span className="conf-step__chair conf-step__chair_disabled"></span> —
        заблокированные (нет кресла)
        <p className="conf-step__hint">
          Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши
        </p>
      </div>
    </div>
    : <div><span>Создайте зал в меню создания зала</span></div>}
    </section>
  );
}

function HallPicker({ item, pickHall, hall }) {
  const { number, id } = item;
  const check = id === hall;
  const change = () => {
    pickHall(id);
  }
  return (
    <li>
      <input
        type="radio"
        className="conf-step__radio"
        name="chairs-hall"
        value="Зал 2"
        onClick={pickHall}
        checked={
            check ? true
            : false
        }
        onChange={change}
      />
      <span className="conf-step__selector">{`Зал ${number}`}</span>
    </li>
  );
};


const halls = [
    {
      number: 1,
      id: 1234,
      row: 10,
      col: 8,
      seats: [
        ["x", "x", "x", "f", "f", "x", "x", "x"],
        ["f", "f", "f", "f", "f", "f", "f", "f"],
        ["f", "f", "f", "f", "f", "f", "f", "f"],
        ["f", "f", "f", "f", "f", "f", "f", "f"],
        ["f", "f", "f", "v", "v", "f", "f", "f"],
        ["f", "f", "f", "v", "v", "f", "f", "f"],
        ["f", "f", "f", "f", "f", "f", "f", "f"],
        ["f", "f", "f", "f", "f", "f", "f", "f"],
        ["f", "f", "f", "f", "f", "f", "f", "f"],
        ["f", "f", "f", "f", "f", "f", "f", "f"],
      ],
    },
    {
        number: 2,
        row: 9,
        id: 12344,
        col: 8,
        seats: [
          ["x", "x", "x", "f", "f", "x", "x", "x"],
          ["f", "f", "f", "f", "f", "f", "f", "f"],
          ["f", "f", "f", "f", "f", "f", "f", "f"],
          ["f", "f", "f", "f", "f", "f", "f", "f"],
          ["f", "f", "f", "v", "v", "f", "f", "f"],
          ["f", "f", "f", "v", "v", "f", "f", "f"],
          ["f", "f", "f", "f", "f", "f", "f", "f"],
          ["f", "f", "f", "f", "f", "f", "f", "f"],
          ["f", "f", "f", "f", "f", "f", "f", "f"],
        ],
      },
  ];
