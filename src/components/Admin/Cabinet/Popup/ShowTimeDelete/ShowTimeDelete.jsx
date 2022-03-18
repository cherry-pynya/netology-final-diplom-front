import { useContext } from "react";
import Popup from "../Popup";
import AdminContext from "../../../../../contex/Admin/AdminContext";
import close from "../../../../../asets/admin/close.png";

export default function ShowTimeDelte() {
  const { showtimeDeletePopup, setshowtimeDeletePopup } =
    useContext(AdminContext);

  return (
    <Popup active={showtimeDeletePopup} setActive={setshowtimeDeletePopup}>
      <ShowTimeDelteContent setshowtimeDeletePopup={setshowtimeDeletePopup} />
    </Popup>
  );
}

function ShowTimeDelteContent({ setshowtimeDeletePopup }) {
  const { deleteShowTime, setDeleteShowTime, showTimes, setShowTimes } = useContext(AdminContext);
  
  const cancel = () => {
    setshowtimeDeletePopup(false);
    setDeleteShowTime(null);
  };

  const submit = () => {
    const index = showTimes.indexOf(deleteShowTime);
    showTimes.splice(index, 1);
    setShowTimes([...showTimes]);
    cancel();
  };

  if (deleteShowTime === null) return <div></div>

  return (
    <div className="popup__content">
      <div className="popup__header">
        <h2 className="popup__title">
          Снятие с сеанса
          <button
            onClick={cancel}
            className="popup__dismiss"
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
            }}
          >
            <img src={close} alt="Закрыть" />
          </button>
        </h2>
      </div>
      <div className="popup__wrapper">
        <form action="вудуеу_hall" method="post" acceptCharset="utf-8">
          <p className="conf-step__paragraph">
            Вы действительно хотите снять с сеанса фильм <span>{deleteShowTime.movie.name}</span>?
          </p>
          <div className="conf-step__buttons text-center">
            <input
              type="submit"
              value="Удалить"
              className="conf-step__button conf-step__button-accent"
              onClick={submit}
            />
            <button className="conf-step__button conf-step__button-regular" onClick={cancel}>
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
