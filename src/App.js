import React, { useContext } from "react";
import AuthContext from "./contex/Auth/AuthContext";
import AuthProvider from "./contex/Auth/AuthProvider";
import GuestMain from "./components/Guest/GuestMain/GuestMain";
import GuestProvider from "./contex/Guest/GuestProvider";

function App() {
  const { admin } = useContext(AuthContext);


  return (
    <AuthProvider>
      <GuestProvider>
        {admin ? <div><span>хуй</span></div> : <GuestMain />}
      </GuestProvider>
    </AuthProvider>
  );
}

export default App;
