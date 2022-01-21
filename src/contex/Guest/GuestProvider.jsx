import { useState } from "react";
import GuestContext from "./GuestContext";
import PropTypes from 'prop-types';

export default function GuestProvider(props) {
    const [message, setMessage] = useState('');

    return (
        <GuestContext.Provider value={message, setMessage}>
            {props.children}
        </GuestContext.Provider>
    );
}

GuestProvider.propTypes = {
    children: PropTypes.node,
};