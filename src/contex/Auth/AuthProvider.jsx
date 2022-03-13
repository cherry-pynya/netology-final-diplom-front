import { useState } from "react";
import AuthContext from "./AuthContext";
import PropTypes from 'prop-types';

export default function AuthProvider(props) {
    const [admin, setAdmin] = useState(false);

    return (
        <AuthContext.Provider value={{admin, setAdmin}}>
            {props.children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node,
};
