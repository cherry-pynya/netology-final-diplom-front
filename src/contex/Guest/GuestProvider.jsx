import { useState } from "react";
import React from "react";
import GuestContext from "./GuestContext";
import PropTypes from "prop-types";
import { useEffect } from "react";
import datesFactory from "../../utils/datesFactory";

export default function GuestProvider(props) {
  const pending = process.env.PENDING || "pending";
  const error = process.env.ERROR || "error";
  const success = process.env.SUCCESS || "success";
  const [dates, setDates] = useState(datesFactory());
  const [customerEvents, setCustomerEvents] = useState([]);
  const [sellingStatus, setSellingStatus] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().getDate());
  const [appStatus, setAppStatus] = useState(success);
  const [displayedData, setDisplayedData] = useState([]);
  const [hallForm, setHallForm] = useState({});

  const changeData = (d, e) => {
    const today = d.find((el) => el.active).fullDate;
    const arr = [];
    const films = e.filter((el) => el.date === today);
    const moviesIDs = {};
    films.forEach((el) => {
      if (el.movie._id in moviesIDs) {
        moviesIDs[el.movie._id] += 1;
      } else {
        moviesIDs[el.movie._id] = 1;
      }
    });
    for (let key in moviesIDs) {
      const movieArr = films.filter((el) => {
        if (el.movie._id === key) return true;
        return false;
      });
      arr.push(movieArr);
    };
    setDisplayedData(arr);
  };

  const getCustomerData = () => {
    setAppStatus(pending);
    try {
      const url =
        process.env.SCHEDULE || "http://localhost:4000/data/getCustomerData";
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCustomerEvents(data.customerEvents);
          setSellingStatus(data.sellingStatus.status);
          changeData(dates, data.customerEvents);
          setAppStatus(success);
        })
        .catch((e) => {
          setAppStatus(error);
          console.log(e);
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
    changeData(dates, customerEvents);
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
    changeData(dates, customerEvents);
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
    changeData(dates, customerEvents);
  };

  return (
    <GuestContext.Provider
      value={{
        dates,
        currentDate,
        nextDay,
        prevDay,
        chooseDate,
        sellingStatus,
        customerEvents,
        appStatus,
        displayedData,
        pending,
        error,
        success,
        changeData,
        getCustomerData,
        hallForm, setHallForm
      }}
    >
      {props.children}
    </GuestContext.Provider>
  );
}

GuestProvider.propTypes = {
  children: PropTypes.node,
};
