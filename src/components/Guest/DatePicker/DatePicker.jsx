import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import ProoTypes from 'prop-types';
import { useContext } from "react";
import GuestContext from "../../../contex/Guest/GuestContext";

export default function DatePicker() {
  const [dates, currentDate] = useContext(GuestContext);
  const endOfTheLine = dates[dates.length - 1].date;;
  const lastElementNumber = dates[dates.length - 1].date;

  return (
    <nav className="page-nav">
      {endOfTheLine !== lastElementNumber ? <DatePickerPrevLink /> : false}
      {dates.map((el) => <DatePickerLink item={el} currentDate={currentDate} key={nanoid()} />)}
      {endOfTheLine === lastElementNumber ? <DatePickerNextLink /> : false}
    </nav>
  );
}

function DatePickerLink({ item, currentDate }) {
  const { weekDay, date, active, weekEnd } = item;
  let classes = 'page-nav__day';
  if (date === currentDate) classes += ' page-nav__day_today';
  if (active) classes += ' page-nav__day_chosen';
  if (weekEnd) classes += ' page-nav__day_weekend';

  return (
    <Link className={classes} to='/'>
      <span className="page-nav__day-week">{weekDay}</span>
      <span className="page-nav__day-number">{date}</span>
    </Link>
  );
}

function DatePickerNextLink() {
    return <Link className="page-nav__day page-nav__day_next" to='/'></Link>
}

function DatePickerPrevLink() {
    return <Link className="page-nav__day page-nav__day_prev" to='/'></Link>
}

DatePickerLink.propTypes = {
    item: ProoTypes.object.isRequired,
    currentDate: ProoTypes.number.isRequired,
}

DatePicker.propTypes = {
    dates: ProoTypes.array,
    currentDate: ProoTypes.number,
}
