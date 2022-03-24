import HeaderGuest from "../Header/HeaderGuest";
import Main from "../Main/Main";
import HallForm from "./HallForm/HallForm";

export default function Hall() {
    return(
        <Main>
            <HeaderGuest />
            <HallForm />
        </Main>
    );
}