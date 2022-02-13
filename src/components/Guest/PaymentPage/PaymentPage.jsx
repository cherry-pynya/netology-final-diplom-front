import { useContext } from "react";
import Main from "../Main/Main";
import GuestContext from "../../../contex/Guest/GuestContext";
import PropTypes from 'prop-types';

export default function PaymentPage() {
  const [dates, currentDate, movies, reservation] = useContext(GuestContext);
  const pay = () => {
    console.log('click')
  };

  return (
    <Main>
      <section className="ticket">
          <PaymentHeader />
          <PaymentBody item={reservation} pay={pay} />
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

function PaymentBody({item, pay}) {
    const { hall, name, seats, row, cost, time, date } = item;
    const seatsStr = seats.join(', ');

    return (
        <div className="ticket__info-wrapper">
        <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{name}</span></p>
        <p className="ticket__info">Ряд: <span className="ticket__details ticket__chairs">{row}</span></p>
        <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">{seatsStr}</span></p>
        <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{hall}</span></p>
        <p className="ticket__info">Дата: <span className="ticket__details ticket__start">{date}</span></p>
        <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{time}</span></p>
        <p className="ticket__info">Стоимость: <span className="ticket__details ticket__cost">{cost}</span> рублей</p>

        <button className="acceptin-button" onClick={pay} >Получить код бронирования</button>

        <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
        <p className="ticket__hint">Приятного просмотра!</p>
      </div>
    );
}

PaymentPage.propTypes = {
    reservation: PropTypes.object,
}

PaymentBody.propTypes = {
    item: PropTypes.object.isRequired,
    pay: PropTypes.func.isRequired
}