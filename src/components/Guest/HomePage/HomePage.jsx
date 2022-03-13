import { useContext } from "react";
import Main from "../Main/Main";
import GuestContext from "../../../contex/Guest/GuestContext";
import Movie from '../Movie/Movie';
import DatePicker from "../DatePicker/DatePicker";
import HeaderGuest from "../Header/HeaderGuest";

export default function HomePage() {
  const {dates, currentDate, movies} = useContext(GuestContext);
  return (
    <Main>
      <HeaderGuest />
      <DatePicker />
      <main>
        {movies.map((el) => (
          <Movie movie={el} key={el.id} />
        ))}
      </main>
    </Main>
  );
}
