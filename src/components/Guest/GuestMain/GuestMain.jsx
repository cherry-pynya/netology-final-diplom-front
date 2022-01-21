import GuestProvider from "../../../contex/Guest/GuestProvider";
import GuestContext from "../../../contex/Guest/GuestContext";
import HeaderGuest from "../Header/HeaderGuest";

export default function GuestMain() {
    return (
        <GuestProvider>
            <HeaderGuest />
        </GuestProvider>
    );
}