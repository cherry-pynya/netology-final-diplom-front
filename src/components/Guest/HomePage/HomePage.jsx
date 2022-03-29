import { useContext } from "react";
import Main from "../Main/Main";
import GuestContext from "../../../contex/Guest/GuestContext";
import Movie from "../Movie/Movie";
import DatePicker from "../DatePicker/DatePicker";
import HeaderGuest from "../Header/HeaderGuest";
import PropTypes from 'prop-types';
import { nanoid } from "nanoid";
import { useEffect } from "react";

export default function HomePage() {
  const { displayedData, setOrder, setHallForm } = useContext(GuestContext);

  useEffect(() => {
    setHallForm(null);
    setOrder([]);
  }, []);

  if (displayedData.length === 0)
    return (
      <Main>
        <HeaderGuest />
        <DatePicker />
        <main>
          <div>
            <span>Нет доступных сеансов!</span>
          </div>
        </main>
      </Main>
    );

  return (
    <Main>
      <HeaderGuest />
      <DatePicker />
      <main>
        {displayedData.map((el) => (
          <Movie event={el} key={nanoid()} />
        ))}
      </main>
    </Main>
  );
};

HomePage.propTypes = {
  displayedData: PropTypes.array, 
  setOrder: PropTypes.func, 
  setHallForm: PropTypes.func, 
};
