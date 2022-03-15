import PropTypes from "prop-types";
import { useState } from "react";
import AdminContext from "./AdminContext";

export default function AdminProvider(props) {
  const [login, setLogin] = useState(false);
  const [halls, setHalls] = useState(hallss);
  const [movies, setMovies] = useState(moviess);
  const [showTimes, setShowTimes] = useState(showTimess);
  const [sellingStatus, setSellingStatus] = useState(false);

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
        sellingStatus, setSellingStatus
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
}

AdminProvider.propTypes = {
  children: PropTypes.node,
};

const hallss = [
  {
    number: 1,
    id: 1234,
    row: 10,
    col: 8,
    vipPrice: 0,
    price: 0,
    seats: [
      ["x", "x", "x", "f", "f", "x", "x", "x"],
      ["f", "f", "f", "f", "f", "f", "f", "f"],
      ["f", "f", "f", "f", "f", "f", "f", "f"],
      ["f", "f", "f", "f", "f", "f", "f", "f"],
      ["f", "f", "f", "v", "v", "f", "f", "f"],
      ["f", "f", "f", "v", "v", "f", "f", "f"],
      ["f", "f", "f", "f", "f", "f", "f", "f"],
      ["f", "f", "f", "f", "f", "f", "f", "f"],
      ["f", "f", "f", "f", "f", "f", "f", "f"],
      ["f", "f", "f", "f", "f", "f", "f", "f"],
    ],
  },
  {
    number: 2,
    row: 9,
    id: 12344,
    vipPrice: 0,
    price: 0,
    col: 8,
    seats: [
      ["x", "x", "x", "f", "f", "x", "x", "x"],
      ["f", "f", "f", "f", "f", "f", "f", "f"],
      ["f", "f", "f", "f", "f", "f", "f", "f"],
      ["f", "f", "f", "f", "f", "f", "f", "f"],
      ["f", "f", "f", "v", "v", "f", "f", "f"],
      ["f", "f", "f", "v", "v", "f", "f", "f"],
      ["f", "f", "f", "f", "f", "f", "f", "f"],
      ["f", "f", "f", "f", "f", "f", "f", "f"],
      ["f", "f", "f", "f", "f", "f", "f", "f"],
    ],
  },
];

const moviess = [
  {
    _id: "1ssdsd",
    name: "Не грози южному централу",
    length: "120 минут",
    img: ".adress",
  },
];

const showTimess = [
  {
    _id: "sdsds",
    time: "13:30",
    hall: {
      number: 1,
      id: 1234,
      row: 10,
      col: 8,
      vipPrice: 0,
      price: 0,
      seats: [
        ["x", "x", "x", "f", "f", "x", "x", "x"],
        ["f", "f", "f", "f", "f", "f", "f", "f"],
        ["f", "f", "f", "f", "f", "f", "f", "f"],
        ["f", "f", "f", "f", "f", "f", "f", "f"],
        ["f", "f", "f", "v", "v", "f", "f", "f"],
        ["f", "f", "f", "v", "v", "f", "f", "f"],
        ["f", "f", "f", "f", "f", "f", "f", "f"],
        ["f", "f", "f", "f", "f", "f", "f", "f"],
        ["f", "f", "f", "f", "f", "f", "f", "f"],
        ["f", "f", "f", "f", "f", "f", "f", "f"],
      ],
    },
    movie: {
      _id: "1ssdsd",
      name: "Не грози южному централу",
      length: "120 минут",
      img: ".adress",
    },
  },
];

const sellingStatus = false;
