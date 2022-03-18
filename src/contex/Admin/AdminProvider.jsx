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
  const [movieAddPopup, setMovieAddPopup] = useState(false);
  const [showtimeAddPopup, setshowtimeAddPopup] = useState(false);
  const [showtimeDeletePopup, setshowtimeDeletePopup] = useState(false);
  const [deleteShowTime, setDeleteShowTime] = useState(null);

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

  const addMovie = (name, length) => {
    setMovieAddPopup(false);
    setAppStatus(pending);
    try {
      const url = process.env.ADDMOVIE || "http://localhost:4000/data/addMovie";
      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, length }),
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

  const saveHallConfig = (halls) => {
    setAppStatus(pending);
    try {
      const url =
        process.env.SAVEHALLCONFIG ||
        "http://localhost:4000/data/saveHallConfig";
      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ halls }),
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

  const saveShowTimes = (showTimes) => {
    setAppStatus(pending);
    try {
      const url =
        process.env.SAVESHOWTIMES || "http://localhost:4000/data/saveShowTimes";
      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ showTimes }),
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

  const changeSellingStatus = (status) => {
    setAppStatus(pending);
    try {
      const url =
        process.env.CHANGESELLINGSTATUS ||
        "http://localhost:4000/data/changeSellingStatus";
      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
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
    setAppStatus(pending);
    try {
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
          setSellingStatus(sellingStatus.status);
          setShowTimes(giveMeTheShow(halls, movies, showTimes));
          setAppStatus(success);
        });
    } catch (e) {
      setAppStatus(error);
      console.log(e);
    }
  };

  useEffect(() => {
    getSchedule();
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
        getSchedule,
        saveHallConfig,
        movieAddPopup,
        setMovieAddPopup,
        addMovie,
        showtimeAddPopup,
        setshowtimeAddPopup,
        showtimeDeletePopup,
        setshowtimeDeletePopup,
        deleteShowTime,
        setDeleteShowTime,
        saveShowTimes,
        changeSellingStatus,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
}

AdminProvider.propTypes = {
  children: PropTypes.node,
};
