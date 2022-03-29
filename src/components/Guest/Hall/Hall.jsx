import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import HeaderGuest from "../Header/HeaderGuest";
import Main from "../Main/Main";
import HallForm from "./HallForm/HallForm";
import Wrong from "../Wrong/Wrong";
import GuestContext from "../../../contex/Guest/GuestContext";

export default function Hall() {
  const { hallForm } = useContext(GuestContext);

  if (!hallForm)
    return (
      <Main>
        <HeaderGuest />
        <Wrong />
      </Main>
    );
  return (
    <Main>
      <HeaderGuest />
      <HallForm />
    </Main>
  );
}

Hall.propTypes = {
  hallForm: PropTypes.object,
};
