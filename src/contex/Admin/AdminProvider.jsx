import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AdminContext from "./AdminContext";
import giveMeTheShow from "../../utils/giveMeTheShow";
import { useNavigate } from "react-router-dom";

export default function AdminProvider(props) {
  const pending = process.env.PENDING || "pending";
  const error = process.env.ERROR || "error";
  const success = process.env.SUCCESS || "success";
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [halls, setHalls] = useState([]);
  const [movies, setMovies] = useState([]);
  const [showTimes, setShowTimes] = useState([]);
  const [sellingStatus, setSellingStatus] = useState(false);
  const [appStatus, setAppStatus] = useState(success);
  const [hallAddPopup, setHallAddPopup] = useState(false);

  const auth = (form) => {
    const { login, password } = form;
    setAppStatus(pending);
    try {
      const url = process.env.AUTH || "http://localhost:4000/auth/login";
      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          const { token } = data;
          setToken(token);
          setAppStatus(success);
          getSchedule();
          setLogin(true);
          console.log(token)
          localStorage.setItem("adminToken", token);
        });
    } catch (e) {
      setAppStatus(error);
      console.log(e);
    }
  };

  const deleteHall = (_id) => {
    setAppStatus(pending);
    try {
      const url =
        process.env.DELETEHALL || "http://localhost:4000/data/deleteHall";
      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id }),
      }).then(() => {
        setAppStatus(success);
        getSchedule();
      });
    } catch (e) {
      setAppStatus(error);
      console.log(e);
    }
  };

  const createHall = (number) => {
    setHallAddPopup(false);
    setAppStatus(pending);
    try {
      const url =
        process.env.CREATEHALL || "http://localhost:4000/data/createHall";
      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ number }),
      }).then(() => {
        setAppStatus(success);
        getSchedule();
        navigate("/admin");
      });
    } catch (e) {
      setAppStatus(error);
      console.log(e);
    }
  };

  const getSchedule = () => {
    const url = process.env.SCHEDULE || "http://localhost:4000/data/schedule";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { halls, movies, sellingStatus, showTimes } = data;
        setHalls(halls);
        setMovies(movies);
        setSellingStatus(sellingStatus);
        setShowTimes(giveMeTheShow(halls, movies, showTimes));
        setAppStatus(success);
      });
  };

  useEffect(() => {
    try {
      getSchedule();
    } catch (e) {
      setAppStatus(error);
      console.log(e);
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{
        login,
        setLogin,
        halls,
        setHalls,
        movies,
        setMovies,
        showTimes,
        setShowTimes,
        sellingStatus,
        setSellingStatus,
        appStatus,
        pending,
        error,
        success,
        hallAddPopup,
        setHallAddPopup,
        createHall,
        deleteHall,
        auth,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
}

AdminProvider.propTypes = {
  children: PropTypes.node,
};
