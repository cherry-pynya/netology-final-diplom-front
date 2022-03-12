import { useState } from "react";
import GuestContext from "./GuestContext";
import PropTypes from 'prop-types';
import { useEffect } from "react";
import { initialDates, initialMovies, initialReservation } from './tempData';
import datesFactory from "../../utils/datesFactory";

export default function GuestProvider(props) {
    const [dates, setDates] = useState(datesFactory());
    const [movies, setMovies] = useState(initialMovies);
    const [reservation, setReservation] = useState(initialReservation);
    const [currentDate, setCurrentDate] = useState(0);

    const nextDay = () => {
        let index = 0;
        let check = true;
        while(check && index <= dates.length - 1) {
            if (dates[index].active) {
                dates[index].active = false;
                dates[index + 1].active = true;
                check = false;
                index += 1;
            } else {
                index += 1;
            }
        }
        setDates([...dates]);
    };

    const prevDay = () => {
        let index = 0;
        let check = true;
        while(check && index <= dates.length - 1) {
            if (dates[index].active) {
                dates[index].active = false;
                dates[index - 1].active = true;
                check = false;
                index += 1;
            } else {
                index += 1;
            }
        }
        setDates([...dates]);
    };

    const chooseDate = (int) => {
        dates.forEach((el) => {
            if (el.date === int) {
                el.active = true;
            } else {
                el.active = false;
            }
        });
        setDates([...dates]);
    }

    useEffect(() => {
      const now = new Date();
      setCurrentDate(now.getDate());
    }, []);

    return (
        <GuestContext.Provider value={{dates, currentDate, movies, reservation, nextDay, prevDay, chooseDate}}>
            {props.children}
        </GuestContext.Provider>
    );
}

GuestProvider.propTypes = {
    children: PropTypes.node,
};