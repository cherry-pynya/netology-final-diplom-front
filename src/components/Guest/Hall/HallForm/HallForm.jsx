import { nanoid } from "nanoid";
import { useEffect, useState, useContext } from "react";
import PropTypes from 'prop-types';
import GuestContext from "../../../../contex/Guest/GuestContext";
import { useNavigate } from "react-router-dom";

export default function HallForm() {
  const { hallForm, order } = useContext(GuestContext);
  const { movie, hall, time, _id } = hallForm;
  const { number } = hall;
  const { name } = movie;
  const navigate = useNavigate();

  const book = () => {
    if (order.length > 0) {
        navigate(`/payment/:${_id}`);
    };
  };

  return (
    <section className="buying">
      <div className="buying__info">
        <div className="buying__info-description">
          <h2 className="buying__info-title">{name}</h2>
          <p className="buying__info-start">{`Начало сеанса: ${time}`}</p>
          <p className="buying__info-hall">{`Зал ${number}`}</p>
        </div>
        <div className="buying__info-hint">
          <p>
            Тапните дважды,
            <br />
            чтобы увеличить
          </p>
        </div>
      </div>
      <SeatPicker hall={hall} />
      <button
        className="acceptin-button"
        onClick={book}
      >
        Забронировать
      </button>
    </section>
  );
};

HallForm.propTypes = {
    hallForm: PropTypes.object,
};

function SeatPicker({ hall }) {
  const {price, vipPrice, seats } = hall;
  return (
    <div className="buying-scheme">
      <div className="buying-scheme__wrapper">
        {seats.map((el, index) => <Row seats={el} row={index} key={nanoid()} />)}
        <div className="buying-scheme__legend">
          <div className="col">
            <p className="buying-scheme__legend-price">
              <span className="buying-scheme__chair buying-scheme__chair_standart"></span>{" "}
              Свободно (<span className="buying-scheme__legend-value">{price}</span>
              руб)
            </p>
            <p className="buying-scheme__legend-price">
              <span className="buying-scheme__chair buying-scheme__chair_vip"></span>{" "}
              Свободно VIP (
              <span className="buying-scheme__legend-value">{vipPrice}</span>
              руб)
            </p>
          </div>
          <div className="col">
            <p className="buying-scheme__legend-price">
              <span className="buying-scheme__chair buying-scheme__chair_taken"></span>{" "}
              Занято
            </p>
            <p className="buying-scheme__legend-price">
              <span className="buying-scheme__chair buying-scheme__chair_selected"></span>{" "}
              Выбрано
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

SeatPicker.propTypes = {
    hall: PropTypes.object.isRequired,
};

function Row({seats, row}) {
    return (
        <div className="buying-scheme__row">
            {seats.map((el, index) => <Seat letter={el} key={nanoid()} row={row} seat={index} />)}
        </div>
    );
};

Row.propTypes = {
    seats: PropTypes.array.isRequired,
    row: PropTypes.number.isRequired,
};

function Seat({seat, letter, row}) {
    const { order, setOrder } = useContext(GuestContext);
    let clas = "buying-scheme__chair buying-scheme__chair_";
    const [color, setColor] = useState('');

    useEffect(() => {
        changeColor();
    }, []);

    const changeColor = () => {
        let state = '';
        const exist = order.find((el) => {
            if (el.row === row && el.seat === seat) return true;
            return false;
        });
        if (exist) {
            setColor('selected');
            return false;
        };
        if (letter === 'x' || letter === 't') {
            state = 'disabled';
        } else if (
            letter === 'f'
        ) {
            state = 'standart'
        } else if (letter === 'v') {
            state = 'vip';
        };
        setColor(state);
    };

    const click = () => {
        const exist = order.find((el) => {
            if (el.row === row && el.seat === seat) return true;
            return false;
        });
        if (exist) {
            const index = order.indexOf(exist);
            order.splice(index, 1);
            setOrder([...order]);
        } else {
            if (letter !== 'x' || letter !== 't') {
                order.push({
                    row,
                    seat,
                    letter
                });
                setOrder([...order]);
            };
        };
    };

    return (
        <span className={`${clas}${color}`} onClick={click}></span>
    );
};

Seat.propTypes = {
    seat: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    letter: PropTypes.string.isRequired
};
