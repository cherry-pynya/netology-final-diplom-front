import poster1 from '../../../asets/client/poster1.jpg'
import poster2 from '../../../asets/client/poster2.jpg'
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
/** 
export default function Movie({showTime}) {
  const {hall, movie, time} = showTime;
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
            <span className="movie__data-duration">{duration} минута</span>
            <span className="movie__data-origin">{origin}</span>
          </p>
        </div>
      </div>
      {halls.map((el) => <Hall item={el} key={nanoid()} />)}
    </section>
  );
}

function Hall({item}) {
    const {number, avalible } = item;
    return (
        <div className="movie-seances__hall">
        <h3 className="movie-seances__hall-title">Зал {number}</h3>
        <ul className="movie-seances__list">
            {avalible.map((el) => <HallItem session={el} key={el.id} />)}
        </ul>
      </div>
    );
}

function HallItem({session}) {
    //ссылка должна вести на страницу выбора мест с айди фильма
    const { time } = session;
    return (
        <li className="movie-seances__time-block">
            <Link className="movie-seances__time" to='/'>
              {time}
            </Link>
          </li>
    );
}
*/