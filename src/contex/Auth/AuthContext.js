import { createContext } from "react";

const AuthContext = createContext({
    admin: false,
});

export default AuthContext;