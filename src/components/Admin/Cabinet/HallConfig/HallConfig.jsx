import { useContext } from "react";
import { useState } from "react";
import AdminContext from "../../../../contex/Admin/AdminContext";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

export default function HallConfig() {
  const [closed, setClosed] = useState(false);
  const [hall, setHall] = useState(null);
  const [form, setForm] = useState({
    _id: null,
    seats: [],
    row: "",
    col: "",
  });
  const { halls, setHalls } = useContext(AdminContext);

  useState(() => {
    if (halls.length > 0) {
      setHall(halls[0]);
      const { _id, seats, row, col } = halls[0];
      setForm({ _id, seats, row, col });
    }
  }, []);

  const toggle = () => {
    setClosed(!closed);
  };

  const pickHall = (_id) => {
    const item = halls.find((el) => el._id === _id);
    if (item) {
        const {row, col} = item;
        setHall({...item});
        form.row = row;
        form.col = col;
        setForm({...form})
    };
  };

  const pushHall = () => {
    const { _id } = hall;
    const elem = halls.find((el) => el._id === _id);
    const index = halls.indexOf(elem);
    halls.splice(index, 1, hall);
  };

  const changeRow = (e) => {
    const value = e.target.value;
    if (value > 10) return false;
    if (value < 0) return false;
    form.row = value;
    setForm({ ...form });
    if (value !== "") {
      const { row } = form;
      changeNumberOfRows(row);
      pushHall();
    }
  };

  const changeNumberOfRows = (number) => {
    const { row, col } = hall;
    if (number < row) {
      hall.seats = hall.seats.slice(0, number);
      hall.row = number;
    } else if (number > row) {
      hall.row = number;
      let newRow = [];
      for (let i = 0; i < col; i++) {
        newRow.push("f");
      }
      const dif = number - hall.seats.length;
      for (let i = 0; i < dif; i++) {
        hall.seats.push(newRow);
      }
    }
    setHall({ ...hall });
  };

  const changeCol = (e) => {
    const value = e.target.value;
    if (value > 10) return false;
    if (value < 0) return false;
    form.col = value;
    setForm({ ...form });
    if (value !== "") {
      const { col } = form;
      changeNumberOfCols(col);
      pushHall();
    }
  };

  const changeNumberOfCols = (number) => {
    if (number > hall.seats[0].length) {
      for (let i = 0; i < hall.seats.length; i++) {
        hall.seats[i].push("f");
      }
      hall.col = number;
    } else if (number < hall.seats[0].length) {
      for (let i = 0; i < hall.seats.length; i++) {
        hall.seats[i] = hall.seats[i].slice(0, number);
      }
      hall.col = number;
    }
    setHall({ ...hall });
  };

  const chnangSeat = (row, col) => {
    const now = hall.seats[row][col];
    if (now === "x") {
      hall.seats[row][col] = "f";
    } else if (now === "f") {
      hall.seats[row][col] = "v";
    } else if (now === "v") {
      hall.seats[row][col] = "x";
    }
    setHall({ ...hall });
    pushHall();
  };

  const cancel = () => {
    console.log('Возвращаем hall из контекста');
  };

  const submit = () => {
    setHalls(halls);
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
      {hall ? (
        <div className="conf-step__wrapper">
          <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
          <ul className="conf-step__selectors-box">
            {halls.map((el) => (
              <HallPicker
                item={el}
                pickHall={pickHall}
                hall={hall._id}
                key={el._id}
              />
            ))}
          </ul>
          <p className="conf-step__paragraph">
            Укажите количество рядов и максимальное количество кресел в ряду:
          </p>
          <p className="conf-step__paragraph">Минимум 1, максимум 10:</p>
          <div className="conf-step__legend">
            <label className="conf-step__label">
              Рядов, шт
              <input
                type="number"
                className="conf-step__input appearance"
                placeholder={hall.row}
                onChange={changeRow}
                maxLength={10}
                minLength={1}
                name="row"
                value={form["row"]}
              />
            </label>
            <span className="multiplier">x</span>
            <label className="conf-step__label">
              Мест, шт
              <input
                type="number"
                className="conf-step__input appearance"
                placeholder={hall.col}
                maxLength={10}
                minLength={1}
                onChange={changeCol}
                name="col"
                value={form["col"]}
              />
            </label>
          </div>
          <SeatsInformationPermission />
          <SeatsInformation />
          <SeatsPicker hall={hall} chnangSeat={chnangSeat} />
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
      ) : (
        <div className="conf-step__wrapper">
          <span>Создайте зал в меню создания зала</span>
        </div>
      )}
    </section>
  );
}

HallConfig.propTypes = {
  halls: PropTypes.object,
};

function HallPicker({ item, pickHall, hall }) {
  const { number, _id } = item;
  const check = _id === hall;
  const change = () => {
    pickHall(_id);
  };
  return (
    <li>
      <input
        type="radio"
        className="conf-step__radio"
        name="chairs-hall"
        value="Зал 2"
        onClick={pickHall}
        checked={check ? true : false}
        onChange={change}
      />
      <span className="conf-step__selector">{`Зал ${number}`}</span>
    </li>
  );
}

HallPicker.propTypes = {
  item: PropTypes.object,
  pickHall: PropTypes.func,
  hall: PropTypes.string,
};

function SeatsPicker({ hall, chnangSeat }) {
  const { seats } = hall;
  return (
    <div className="conf-step__hall">
      <div className="conf-step__hall-wrapper">
        {seats.map((item, index) => (
          <Row arr={item} key={nanoid()} col={index} chnangSeat={chnangSeat} />
        ))}
      </div>
    </div>
  );
}

SeatsPicker.propTypes = {
  hall: PropTypes.object,
  chnangSeat: PropTypes.func,
};

function Row({ arr, col, chnangSeat }) {
  return (
    <div className="conf-step__row">
      {arr.map((letter, index) => (
        <Seat
          key={nanoid()}
          letter={letter}
          col={col}
          row={index}
          chnangSeat={chnangSeat}
        />
      ))}
    </div>
  );
}

Row.propTypes = {
  arr: PropTypes.array,
  col: PropTypes.number,
  chnangSeat: PropTypes.func,
};

function Seat({ letter, col, row, chnangSeat }) {
  let status = "";
  if (letter === "x") {
    status = "disabled";
  } else if (letter === "f") {
    status = "standart";
  } else {
    status = "vip";
  }
  const click = () => {
    chnangSeat(col, row);
  };
  return (
    <span
      className={`conf-step__chair conf-step__chair_${status}`}
      onClick={click}
    ></span>
  );
}

Seat.propTypes = {
  letter: PropTypes.string,
  col: PropTypes.number,
  row: PropTypes.number,
  chnangSeat: PropTypes.func,
};

function SeatsInformation() {
  return (
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
  );
}

function SeatsInformationPermission() {
  return (
    <p className="conf-step__paragraph">
      Теперь вы можете указать типы кресел на схеме зала:
    </p>
  );
};
