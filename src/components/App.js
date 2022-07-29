import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState } from "react";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isPreviewImageOpen, setIsPreviewImageOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    aboutMe: "",
    avatar: "",
  });

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser({
          name: res.name,
          aboutMe: res.aboutMe,
          avatar: res.avatar,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setIsPreviewImageOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPreviewImageOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isPreviewImageOpen}
          onClose={closeAllPopups}
        ></ImagePopup>
        <PopupWithForm
          name="profile"
          title="Edit profile"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          buttonText={"Save"}
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
          name="changeAvatar"
          title="Change avatar"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonText={"Save"}
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
          buttonText={"Create"}
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

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
