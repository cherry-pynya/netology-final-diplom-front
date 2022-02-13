import HeaderGuest from "../Header/HeaderGuest";

export default function Main(props) {
    return (
        <main>
            <HeaderGuest />
            {props.children}
        </main>
    );
}