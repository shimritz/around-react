import React from "react";

function ImagePopup() {
  return (
    <div className="modal modal_type_preview">
      <div className="modal__container modal__container_type_preview">
        <button
          type="button"
          className="modal__close-btn modal__close-btn_preview"
          aria-label="close-button"
        ></button>
        <img className="modal__popup-image" src="#" alt="popup image" />
        <h2 className="modal__popup-name"></h2>
      </div>
    </div>
  );
}

export default ImagePopup;
