import { useContext } from "react";
import { useState } from "react";
import AdminContext from "../../../../contex/Admin/AdminContext";
import PropTypes from "prop-types";
import { useEffect } from "react";
import poster from "../../../../asets/admin/poster.png";
import { nanoid } from "nanoid";

export default function MovieConfig() {
  const [closed, setClosed] = useState(false);
  const [backup, setBackup] = useState([]);
  const { movies, halls, setMovieAddPopup, showTimes, setShowTimes, saveShowTimes } = useContext(AdminContext);

  useEffect(() => {
    showTimes.forEach((el) => {
      backup.push({...el});
    });
    setBackup([...backup]);
  }, []);

  const close = () => {
    setClosed(!closed);
  };

  const cancel = () => {
    setShowTimes(backup);
  };

  const submit = () => {
    saveShowTimes(showTimes);
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
          <button
            className="conf-step__button conf-step__button-accent"
            onClick={() => setMovieAddPopup(true)}
          >
            Добавить фильм
          </button>
        </p>
        <div className="conf-step__movies">
          {movies.map((item) => (
            <Movie movie={item} key={nanoid()} />
          ))}
        </div>
        <div className="conf-step__seances">
          {halls.map((el) => (
            <ShowTime hall={el} key={nanoid()} />
          ))}
        </div>
        <fieldset className="conf-step__buttons text-center">
          <button
            className="conf-step__button conf-step__button-regular"
            onClick={cancel}
          >
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
    </section>
  );
}

MovieConfig.propTypes = {
  movies: PropTypes.array,
  setMovies: PropTypes.func,
  showTime: PropTypes.array,
  setShowTime: PropTypes.func,
  showTimes: PropTypes.array,
  setShowTimes: PropTypes.func,
  saveShowTimes: PropTypes.func
};

function Movie({ movie }) {
  const { name, length } = movie;
  return (
    <div className="conf-step__movie">
      <img className="conf-step__movie-poster" alt="poster" src={poster} />
      <h3 className="conf-step__movie-title">{name}</h3>
      <p className="conf-step__movie-duration">{`${length} минут`}</p>
    </div>
  );
}

Movie.propTypes = {
  movie: PropTypes.object,
};

function ShowTime({ hall }) {
  const { showTimes, setshowtimeAddPopup } = useContext(AdminContext);
  const [show, setShow] = useState([]);
  const { number, _id } = hall;

  useEffect(() => {
    setShow(showTimes.filter((el) => el.hall._id === _id));
  }, []);

  const click = (e) => {
    setshowtimeAddPopup(true);
  };

  return (
    <div className="conf-step__seances-hall" onClick={click}>
      <h3 className="conf-step__seances-title">{`Зал ${number}`}</h3>

      <div className="conf-step__seances-timeline">
        {show.map((el) => (
          <ShowTimeItem el={el} time={el.time} movie={el.movie} key={nanoid()} />
        ))}
      </div>
    </div>
  );
}

ShowTime.propTypes = {
  hall: PropTypes.object,
  showTimes: PropTypes.array,
  setshowtimeAddPopup: PropTypes.func,
};

function ShowTimeItem({ time, movie, el }) {
  const { name, length } = movie;
  const [dist, setDist] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);
  const { setshowtimeDeletePopup, setDeleteShowTime } =
    useContext(AdminContext);

  useEffect(() => {
    const width = document.querySelector(
      ".conf-step__seances-timeline"
    ).offsetWidth;
    const step = ((width - 60) / 1440).toFixed(2);
    const hours = +time.slice(0, 2);
    const mins = +time.slice(3, 5);
    setDist((hours * 60 + mins) * step);
    setBoxWidth(length * step);
  }, []);

  const click = (e) => {
    e.stopPropagation();
    console.log(el)
    setDeleteShowTime(el);
    setshowtimeDeletePopup(true);
  };

  return (
    <div
      className="conf-step__seances-movie"
      style={{
        width: `${boxWidth}px`,
        backgroundColor: "rgb(133, 255, 137)",
        left: `${dist}px`,
        height: "auto",
      }}
      onClick={click}
    >
      <p className="conf-step__seances-movie-title">{name}</p>
      <p className="conf-step__seances-movie-start">{time}</p>
    </div>
  );
}

ShowTimeItem.propTypes = {
  time: PropTypes.string,
  movie: PropTypes.object,
  el: PropTypes.object,
  setshowtimeDeletePopup: PropTypes.func,
  setDeleteShowTime: PropTypes.func,
  showTimes: PropTypes.array
};
