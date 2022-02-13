import { useState } from "react";
import GuestContext from "./GuestContext";
import PropTypes from 'prop-types';
import { useEffect } from "react";
import { initialDates, initialMovies, initialReservation } from './tempData';

export default function GuestProvider(props) {
    const [dates, setDates] = useState(initialDates);
    const [movies, setMovies] = useState(initialMovies);
    const [reservation, setReservation] = useState(initialReservation);
    const [currentDate, setCurrentDate] = useState(0);

    useEffect(() => {
      const now = new Date();
      setCurrentDate(now.getDate());
    }, []);

    return (
        <GuestContext.Provider value={[dates, currentDate, movies, reservation]}>
            {props.children}
        </GuestContext.Provider>
    );
}

GuestProvider.propTypes = {
    children: PropTypes.node,
};