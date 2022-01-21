import React, { useContext } from "react";
import AuthContext from "./contex/Auth/AuthContext";
import AuthProvider from "./contex/Auth/AuthProvider";
import GuestMain from "./components/Guest/GuestMain/GuestMain";

function App() {
  const { admin } = useContext(AuthContext);


  return (
    <AuthProvider>
      {admin ? <div><span>хуй</span></div> : <GuestMain />}
    </AuthProvider>
  );
}

export default App;
