import { createContext } from "react";

const GuestContext = createContext({
    message: 'hi, stranger',
});

export default GuestContext;