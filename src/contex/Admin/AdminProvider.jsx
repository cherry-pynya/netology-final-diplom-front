import PropTypes from 'prop-types';
import { useState } from 'react';
import AdminContext from './AdminContext';

export default function AdminProvider(props) {
    const [login, setLogin] = useState(false);
    const [halls, setHalls] = useState(hallss);
    return (
        <AdminContext.Provider value={{login, setLogin, halls, setHalls}}>
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