import { useContext } from "react";
import { useState } from "react";
import AdminContext from "../../../../contex/Admin/AdminContext";
import PropTypes from "prop-types";
import { useEffect } from "react";
import poster from "../../../../asets/admin/poster.png";
import { nanoid } from "nanoid";

export default function MovieConfig() {
  const [closed, setClosed] = useState(false);
  const { movies, setMovies, showTimes, setShowTimes, halls } =
    useContext(AdminContext);

  const close = () => {
    setClosed(!closed);
  };

  const cancel = () => {

  };

  const submit = () => {

  };

  return (
    <section className="conf-step">
      <header
        className={
          !closed
            ? "conf-step__header conf-step__header_opened"
            : "conf-step__header conf-step__header_closed"
        }
        onClick={close}
      >
        <h2 className="conf-step__title">Сетка сеансов</h2>
      </header>
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">
          <button className="conf-step__button conf-step__button-accent">
            Добавить фильм
          </button>
        </p>
        <div className="conf-step__movies">
          {movies.map((item) => (
            <Movie movie={item} key={item._id} />
          ))}
        </div>
        <div className="conf-step__seances">
          {halls.map((el) => (
            <ShowTime hall={el} key={nanoid()} />
          ))}
        </div>
        <fieldset className="conf-step__buttons text-center">
          <button className="conf-step__button conf-step__button-regular" onClick={cancel}>Отмена</button>
          <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" onClick={submit} />
        </fieldset> 
      </div>
    </section>
  );
}

MovieConfig.propTypes = {
  movies: PropTypes.array,
  setMovies: PropTypes.func,
  showTime: PropTypes.array,
  setShowTime: PropTypes.func,
};

function Movie({ movie }) {
  const { name, length } = movie;
  return (
    <div className="conf-step__movie">
      <img className="conf-step__movie-poster" alt="poster" src={poster} />
      <h3 className="conf-step__movie-title">{name}</h3>
      <p className="conf-step__movie-duration">{length}</p>
    </div>
  );
}

Movie.propTypes = {
  movie: PropTypes.object,
};

function ShowTime({ hall }) {
  const { showTimes } = useContext(AdminContext);
  const [show, setShow] = useState([]);
  const { number, _id } = hall;

  useEffect(() => {
    setShow(showTimes.filter((el) => el.hall._id === _id));
  }, []);

  return (
    <div className="conf-step__seances-hall">
      <h3 className="conf-step__seances-title">{`Зал ${number}`}</h3>
        {show.map((el) => <ShowTimeItem time={el.time} movie={el.movie} key={nanoid()} />)}
      <div className="conf-step__seances-timeline"></div>
    </div>
  );
};

ShowTime.propTypes = {
    hall: PropTypes.object,
    showTimes: PropTypes.array,
};

function ShowTimeItem({ time, movie }) {
  const { name, length } = movie;
  const [dist, setDist] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);
  
  useEffect(() => {
      const width = document.querySelector('.conf-step__seances-timeline').offsetWidth;
      const step = ((width - 60) / 1440).toFixed(2);
      const hours = +time.slice(0, 2);
      const mins = +time.slice(3, 5);
      setDist((hours * 60 + mins) * step);
      const movieLength = +length.slice(0, 3);
      setBoxWidth(movieLength * step)
  }, []);

  return (
    <div
    className="conf-step__seances-movie"
      style={{
          width: `${boxWidth}px`,
          backgroundColor: 'rgb(133, 255, 137)',
          left: `${dist}px`,
          height: 'auto',
      }}
    >
      <p className="conf-step__seances-movie-title">{name}</p>
      <p className="conf-step__seances-movie-start">{time}</p>
    </div>
  );
};

ShowTimeItem.propTypes = {
    time: PropTypes.string,
    movie: PropTypes.object,
};



