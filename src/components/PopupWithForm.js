import React, { Children } from "react";

function PopupWithForm({ name, title, isOpen, onClose, children, buttonText }) {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__container">
        <button
          type="button"
          className="modal__close-btn modal__close-btn_profile"
          aria-label="close-button"
          onClick={onClose}
        ></button>
        <form className="form" name={name}>
          <h2 className="form__title">{title}</h2>
          {children}
          <button type="submit" className="form__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
