import poster1 from '../../../asets/client/poster1.jpg'
import poster2 from '../../../asets/client/poster2.jpg'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react'; 
import GuestContext from '../../../contex/Guest/GuestContext';

export default function Movie({event}) {
  const {movie} = event[0];
  const {name, length, desc} = movie;

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const arr = [];
    const obj = {};
    event.forEach((el) => {
      if (el.hall._id in obj) {
        obj[el.hall._id] += 1;
      } else {
        obj[el.hall._id] = 1;
      }
    });
    for (let key in obj) {
      const movie = event.filter((el) => {
        if (el.hall._id === key) return true;
        return false;
      });
      arr.push(movie);
    };
    setMovies(arr);
  }, []);

  return (
    <section className="movie">
      <div className="movie__info">
        <div className="movie__poster">
          <img
            className="movie__poster-image"
            alt='постер к фильму '
            src={poster1}
          />
        </div>
        <div className="movie__description">
          <h2 className="movie__title">{name}</h2>
          <p className="movie__synopsis">
            {desc}
          </p>
          <p className="movie__data">
            <span className="movie__data-duration">{length} минут </span>
            <span className="movie__data-origin">{'США'}</span>
          </p>
        </div>
      </div>
      {movies.map((el) => <Hall item={el} key={nanoid()} />)}
    </section>
  );
};

Movie.propTypes = {
  event: PropTypes.array,

};

function Hall({item}) {
  const { hall } = item[0];
  const { number } = hall;
    return (
        <div className="movie-seances__hall">
        <h3 className="movie-seances__hall-title">Зал {number}</h3>
        <ul className="movie-seances__list">
            {item.map((el) => <HallItem session={el} key={nanoid()} />)}
        </ul>
      </div>
    );
};

Hall.propTypes = {
  item: PropTypes.array,

};

function HallItem({session}) {
    //ссылка должна вести на страницу выбора мест с айди фильма
    const { setHallForm } = useContext(GuestContext);
    const { time, _id } = session;

    return (
        <li className="movie-seances__time-block">
            <Link onClick={() => setHallForm(session)} className="movie-seances__time" to={`/showTime/:${_id}`}>
              {time}
            </Link>
          </li>
    );
};

HallItem.propTypes = {
  setHallForm: PropTypes.func,
  session: PropTypes.object,
};
