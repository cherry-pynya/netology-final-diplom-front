import { useState } from "react";
import React from "react";
import GuestContext from "./GuestContext";
import PropTypes from "prop-types";
import { useEffect } from "react";
import datesFactory from "../../utils/datesFactory";
import giveMeTheShow from "../../utils/giveMeTheShow";

export default function GuestProvider(props) {
  const pending = process.env.PENDING || "pending";
  const error = process.env.ERROR || "error";
  const success = process.env.SUCCESS || "success";
  const [dates, setDates] = useState(datesFactory());
  const [halls, setHalls] = useState([]);
  const [movies, setMovies] = useState([]);
  const [showTimes, setShowTimes] = useState([]);
  const [sellingStatus, setSellingStatus] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().getDate());
  const [appStatus, setAppStatus] = useState(success);

  const getSchedule = () => {
    setAppStatus(pending);
    try {
      const url = process.env.SCHEDULE || "http://localhost:4000/data/schedule";
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const { halls, movies, sellingStatus, showTimes } = data;
          setHalls(halls);
          setMovies(movies);
          setSellingStatus(sellingStatus.status);
          setShowTimes(giveMeTheShow(halls, movies, showTimes));
          setAppStatus(success);
          setAppStatus(success);
        });
    } catch (e) {
      setAppStatus(error);
      console.log(e);
    }
  };

  const nextDay = () => {
    let index = 0;
    let check = true;
    while (check && index <= dates.length - 1) {
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
    while (check && index <= dates.length - 1) {
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
  };

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <GuestContext.Provider
      value={{
        dates,
        currentDate,
        nextDay,
        prevDay,
        chooseDate,
        showTimes,
        sellingStatus
      }}
    >
      {props.children}
    </GuestContext.Provider>
  );
}

GuestProvider.propTypes = {
  children: PropTypes.node,
};
