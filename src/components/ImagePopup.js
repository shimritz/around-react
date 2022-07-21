import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`modal modal_type_preview ${card ? "modal_open" : ""}`}>
      <div className="modal__container modal__container_type_preview">
        <button
          type="button"
          className="modal__close-btn modal__close-btn_preview"
          aria-label="close-button"
          onClick={onClose}
        ></button>
        <img
          className="modal__popup-image"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <h2 className="modal__popup-name"></h2>
      </div>
    </div>
  );
}

export default ImagePopup;
