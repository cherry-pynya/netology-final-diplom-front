import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import ProoTypes from 'prop-types';
import { useContext } from "react";
import GuestContext from "../../../contex/Guest/GuestContext";

export default function DatePicker() {
  const {dates, currentDate} = useContext(GuestContext);
  const endOfTheLine = dates[dates.length - 1].date;;
  const beginnig = dates[0].date;
  const curent = dates.find((el) => el.active === true).date;

  return (
    <nav className="page-nav">
      {beginnig !== curent ? <DatePickerPrevLink /> : false}
      {dates.map((el) => <DatePickerLink item={el} currentDate={currentDate} key={nanoid()} />)}
      {endOfTheLine !== curent ? <DatePickerNextLink /> : false}
    </nav>
  );
}

function DatePickerLink({ item, currentDate }) {
  const { weekDay, date, active, weekEnd } = item;
  let classes = 'page-nav__day';
  if (date === currentDate) classes += ' page-nav__day_today';
  if (active) classes += ' page-nav__day_chosen';
  if (weekEnd) classes += ' page-nav__day_weekend';

  const { chooseDate } = useContext(GuestContext);

  const click = () => {
    chooseDate(date);
  };

  return (
    <button className={classes} style={{border: 'none', outline: 'none'}} onClick={click}>
      <span className="page-nav__day-week">{weekDay}</span>
      <span className="page-nav__day-number">{date}</span>
    </button>
  );
}

function DatePickerNextLink() {
    const { nextDay } = useContext(GuestContext);
    return <button className="page-nav__day page-nav__day_next" onClick={nextDay} style={{border: 'none', outline: 'none'}}></button>
}

function DatePickerPrevLink() {
  const { prevDay } = useContext(GuestContext);
    return <button className="page-nav__day page-nav__day_prev" onClick={prevDay} style={{border: 'none', outline: 'none'}}></button>
}

DatePickerLink.propTypes = {
    item: ProoTypes.object.isRequired,
    currentDate: ProoTypes.number.isRequired,
}

DatePicker.propTypes = {
    dates: ProoTypes.array,
    currentDate: ProoTypes.number,
}
