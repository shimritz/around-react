import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState } from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }

  return (
    <>
      <div className="page">
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <PopupWithForm
          name="profile"
          title="Edit profile"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            id="name-input"
            className="form__input form__input_type_name"
            type="text"
            name="name"
            required
            minLength="2"
            maxLength="40"
          />
          <span id="name-input-error"></span>
          <input
            id="aboutme-input"
            className="form__input form__input_type_about-me"
            type="text"
            name="aboutMe"
            required
            minLength="2"
            maxLength="200"
          />
          <span id="aboutme-input-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name=""
          title="Change avatar"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            className="form__input form__input_type_image"
            type="url"
            name="image"
            id="avatarImage-input"
            placeholder="Image URL"
            required
          />
          <span id="avatarImage-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
          name="addNewCard"
          title="New Place"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            id="title-input"
            className="form__input form__input_type_name"
            type="text"
            name="title"
            placeholder="Title"
            required
            minLength="1"
            maxLength="30"
          />
          <span id="title-input-error"></span>
          <input
            id="image-input"
            className="form__input form__input_type_image"
            type="url"
            name="image"
            placeholder="Image URL"
            required
          />
          <span id="image-input-error"></span>
        </PopupWithForm>
        {/* <PopupWithForm
          name="confirm"
          title="Are You sure?"
          // onPopupOpen={handlePopupOpen}
          onClose={closeAllPopups}
        ></PopupWithForm> */}
        {/* <ImagePopup /> */}
        {/* <div className="modal modal_type_profile">
          <div className="modal__container">
            <button
              type="button"
              className="modal__close-btn modal__close-btn_profile"
              aria-label="close-button"
            ></button>
            <form className="form" name="profile">
              <h2 className="form__title">Edit profile</h2> */}
        {/* <button type="submit" className="form__submit">
                Save
              </button>
            </form>
          </div>
        </div> */}
        {/* <div className="modal modal_type_avatar-change">
          <div className="modal__container ">
            <button
              type="button"
              className="modal__close-btn modal__close-btn_profile"
              aria-label="close-button"
            ></button>

            <form className="form ">
              <h2 className="form__title">Change avatar</h2> */}
        {/* <input
                className="form__input form__input_type_image"
                type="url"
                name="image"
                id="avatarImage-input"
                placeholder="Image URL"
                required
              />
              <span id="avatarImage-input-error"></span> */}

        {/* <button type="submit" className="form__submit">
                Save
              </button>
            </form>
          </div>
        </div> */}
        {/* <div className="modal modal_type_add-card">
          <div className="modal__container">
            <button
              type="button"
              className="modal__close-btn modal__close-btn_add-card"
              aria-label="close-button"
            ></button>
            <form className="form" name="addNewCard" id="addcardform">
              <h2 className="form__title">New Place</h2>
              <input
                id="title-input"
                className="form__input form__input_type_name"
                type="text"
                name="title"
                placeholder="Title"
                required
                minLength="1"
                maxLength="30"
              />
              <span id="title-input-error"></span>
              <input
                id="image-input"
                className="form__input form__input_type_image"
                type="url"
                name="image"
                placeholder="Image URL"
                required
              />
              <span id="image-input-error"></span>

              <button
                type="submit"
                className="form__submit form__submit_disabled"
                disabled
              >
                Create
              </button>
            </form>
          </div>
        </div> */}
        {/* <div className="modal modal_type_delete-card">
          <div className="modal__container">
            <button
              type="button"
              className="modal__close-btn modal__close-btn_delete-card"
              aria-label="close-button"
            ></button>

            <form className="form" name="confirm">
              <h2 className="form__title">Are you sure?</h2> */}
        {/* <button type="submit" className="form__submit">
                Delete
              </button>
            </form>
          </div> */}
        {/* </div> */}
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
        <template id="card-template">
          <article className="card">
            <img className="card__image" src="#" alt="a picture of a valley" />
            <button
              type="button"
              className="card_close card__bin-btn"
              aria-label="delete button"
            ></button>
            <div className="card__footer">
              <h2 className="card__name"></h2>
              <div className="card__likes">
                <button
                  type="button"
                  className="card__like-btn"
                  aria-label="like button"
                ></button>
                <div className="card__likes-count"></div>
              </div>
            </div>
          </article>
        </template>
        <Footer />
      </div>
    </>
  );

  // function handleEditAvatarClick() {
  //   console.log("kokoko");
  //   const avatarChangePopup = document.querySelector(
  //     ".modal_type_avatar-change"
  //   );
  //   avatarChangePopup.classList.add("modal_open");
  // }
  // function handleEditProfileClick() {
  //   console.log("EditprofileEvent");
  //   const avatarChangePopup = document.querySelector(".modal_type_profile");
  //   avatarChangePopup.classList.add("modal_open");
  // }
  // function handleAddPlaceClick() {
  //   console.log("ADDprofileEvent");
  //   const avatarChangePopup = document.querySelector(".modal_type_add-card");
  //   avatarChangePopup.classList.add("modal_open");
  // }
  function handleCardClick() {
    const imagePopup = document.querySelector(".modal_type_preview");
    console.log("XXX", imagePopup);
    imagePopup.classList.add("modal_open");
  }
}

export default App;
