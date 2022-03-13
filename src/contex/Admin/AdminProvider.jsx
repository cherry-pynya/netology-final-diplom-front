import PropTypes from 'prop-types';
import { useState } from 'react';
import AdminContext from './AdminContext';

export default function AdminProvider(props) {
    const [login, setLogin] = useState(false);
    const [halls, setHalls] = useState([]);
    return (
        <AdminContext.Provider value={{login, setLogin, halls}}>
            {props.children}
        </AdminContext.Provider>
    );
}

AdminProvider.propTypes = {
    children: PropTypes.node,
};