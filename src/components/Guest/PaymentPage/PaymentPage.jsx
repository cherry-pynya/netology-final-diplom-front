import { useContext, useState, useEffect } from "react";
import Main from "../Main/Main";
import GuestContext from "../../../contex/Guest/GuestContext";
import PropTypes from "prop-types";
import HeaderGuest from "../Header/HeaderGuest";
import { nanoid } from "nanoid";

export default function PaymentPage() {
  return (
    <Main>
      <HeaderGuest />
      <section className="ticket">
        <PaymentHeader />
        <PaymentBody />
      </section>
    </Main>
  );
}

function PaymentHeader() {
  return (
    <header className="tichet__check">
      <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
    </header>
  );
}

function PaymentBody() {
  const [cost, setCost] = useState(0);
  const { order, hallForm } = useContext(GuestContext);
  const { movie, hall, date, time } = hallForm;
  const { number } = hall;
  const { name } = movie;

  const count = () => {};

  useEffect(() => {
    let start = 0;
    const { price, vipPrice } = hall;
    order.forEach((el) => {
      if (el.letter === "f") start += price;
      if (el.letter === "v") start += vipPrice;
    });
    setCost(start);
  }, []);

  const pay = () => {};

  return (
    <div className="ticket__info-wrapper">
      <p className="ticket__info">
        На фильм: <span className="ticket__details ticket__title">{name}</span>
      </p>
      {order.map((el)=> <SeatAndRow item={el} key={nanoid()} />)}
      <p className="ticket__info">
        В зале: <span className="ticket__details ticket__hall">{number}</span>
      </p>
      <p className="ticket__info">
        Дата: <span className="ticket__details ticket__start">{date}</span>
      </p>
      <p className="ticket__info">
        Начало сеанса:{" "}
        <span className="ticket__details ticket__start">{time}</span>
      </p>
      <p className="ticket__info">
        Стоимость: <span className="ticket__details ticket__cost">{cost}</span>{" "}
        рублей
      </p>

      <button className="acceptin-button" onClick={pay}>
        Получить код бронирования
      </button>

      <p className="ticket__hint">
        После оплаты билет будет доступен в этом окне, а также придёт вам на
        почту. Покажите QR-код нашему контроллёру у входа в зал.
      </p>
      <p className="ticket__hint">Приятного просмотра!</p>
    </div>
  );
};

PaymentBody.propTypes = {
  order: PropTypes.array, 
  hallForm: PropTypes.object,
};

function SeatAndRow({ item }) {
  const { row, seat } = item;
  return (
    <p className="ticket__info">
      Ряд: <span className="ticket__details ticket__chairs">{row+1}</span>
      <br/>
      Места: <span className="ticket__details ticket__chairs">{seat+1}</span>
    </p>
  );
};

SeatAndRow.propTypes = {
  item: PropTypes.object,
};
