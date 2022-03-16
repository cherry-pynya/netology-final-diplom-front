import PropTypes from 'prop-types';

export default function Popup({active, setActive, children}) {

  return (
    <div className={
        !active ? "popup"
        : "popup active"
    }>
      <div className="popup__container">
          {children}
      </div>
    </div>
  );
};

Popup.propTypes = {
    children: PropTypes.element,
    active: PropTypes.bool,
    setActive: PropTypes.func,
}
