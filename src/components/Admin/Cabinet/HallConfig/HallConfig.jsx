import { useContext, useEffect } from "react";
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
  const { halls, setHalls, saveHallConfig } = useContext(AdminContext);
  const [backup, setBackup] = useState([]);

  useEffect(() => {
    if (halls.length > 0) {
      const arr = [];
      for (let i = 0; i < halls.length; i++) {
        arr.push({ ...halls[i] });
      }
      setBackup(arr);
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
      const { row, col } = item;
      setHall({ ...item });
      form.row = row;
      form.col = col;
      setForm({ ...form });
    }
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
    hall.row = +number;
    if (number < row) {
      hall.seats = hall.seats.slice(0, number);
    } else if (number > row) {
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
    pushHall();
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
    hall.col = +number;
    const { row } = hall;
    const newSeats = [];
    const arr = [];
    for (let i = 0; i < +number; i++) {
      arr.push("f");
    }
    for (let i = 0; i < row; i++) {
      newSeats.push(arr);
    }
    hall.seats = newSeats;
    setHall({ ...hall });
    pushHall();
  };

  const chnangeSeat = (row, col) => {
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
    setHalls(backup);
    setHall(backup[0]);
    const { _id, seats, row, col } = backup[0];
    setForm({_id, seats, row, col});
  };

  const submit = (e) => {
    e.preventDefault();
    saveHallConfig(halls);
  };

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
        <h2 className="conf-step__title">???????????????????????? ??????????</h2>
      </header>
      {hall ? (
        <div className="conf-step__wrapper">
          <p className="conf-step__paragraph">???????????????? ?????? ?????? ????????????????????????:</p>
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
            ?????????????? ???????????????????? ?????????? ?? ???????????????????????? ???????????????????? ???????????? ?? ????????:
          </p>
          <p className="conf-step__paragraph">?????????????? 1, ???????????????? 10:</p>
          <div className="conf-step__legend">
            <label className="conf-step__label">
              ??????????, ????
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
              ????????, ????
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
          <SeatsPicker hall={hall} chnangeSeat={chnangeSeat} />
          <fieldset className="conf-step__buttons text-center">
            <button
              className="conf-step__button conf-step__button-regular"
              onClick={cancel}
            >
              ????????????
            </button>
            <input
              type="submit"
              value="??????????????????"
              className="conf-step__button conf-step__button-accent"
              onClick={submit}
            />
          </fieldset>
        </div>
      ) : (
        <div className="conf-step__wrapper">
          <span>???????????????? ?????? ?? ???????? ???????????????? ????????</span>
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
        value="?????? 2"
        onClick={pickHall}
        checked={check ? true : false}
        onChange={change}
      />
      <span className="conf-step__selector">{`?????? ${number}`}</span>
    </li>
  );
}

HallPicker.propTypes = {
  item: PropTypes.object,
  pickHall: PropTypes.func,
  hall: PropTypes.string,
};

function SeatsPicker({ hall, chnangeSeat }) {
  const { seats } = hall;
  const click = (e) => {
    const { row, col } = e.target.closest('.conf-step__chair').dataset;
    chnangeSeat(col, row);
  };
  return (
    <div className="conf-step__hall">
      <div className="conf-step__hall-wrapper" onClick={click}>
        {seats.map((item, index) => (
          <Row arr={item} key={nanoid()} col={index} />
        ))}
      </div>
    </div>
  );
}

SeatsPicker.propTypes = {
  hall: PropTypes.object,
  chnangeSeat: PropTypes.func,
};

function Row({ arr, col }) {
  return (
    <div className="conf-step__row">
      {arr.map((letter, index) => (
        <Seat
          key={nanoid()}
          letter={letter}
          col={col}
          row={index}
        />
      ))}
    </div>
  );
}

Row.propTypes = {
  arr: PropTypes.array,
  col: PropTypes.number,
};

function Seat({ letter, col, row }) {
  let status = "";
  if (letter === "x") {
    status = "disabled";
  } else if (letter === "f") {
    status = "standart";
  } else {
    status = "vip";
  }
  return (
    <span
      data-row={row}
      data-col={col}
      className={`conf-step__chair conf-step__chair_${status}`}
    ></span>
  );
}

Seat.propTypes = {
  letter: PropTypes.string,
  col: PropTypes.number,
  row: PropTypes.number,
};

function SeatsInformation() {
  return (
    <div className="conf-step__legend">
      <span className="conf-step__chair conf-step__chair_standart"></span> ???
      ?????????????? ????????????
      <span className="conf-step__chair conf-step__chair_vip"></span> ??? VIP
      ????????????
      <span className="conf-step__chair conf-step__chair_disabled"></span> ???
      ?????????????????????????????? (?????? ????????????)
      <p className="conf-step__hint">
        ?????????? ???????????????? ?????? ????????????, ?????????????? ???? ???????? ?????????? ?????????????? ????????
      </p>
    </div>
  );
}

function SeatsInformationPermission() {
  return (
    <p className="conf-step__paragraph">
      ???????????? ???? ???????????? ?????????????? ???????? ???????????? ???? ?????????? ????????:
    </p>
  );
}
