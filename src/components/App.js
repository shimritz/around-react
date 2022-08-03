import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState } from "react";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";

function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isPreviewImageOpen, setIsPreviewImageOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({
    _id: "",
    name: "",
    aboutMe: "",
    avatar: "",
  });

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser({
          _id: res._id,
          name: res.name,
          aboutMe: res.about,
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

  // function handleCardLike(card) {
  //    const isLiked = card.likes.some((user) => user._id === currentUser._id);
  //  api.addLike(card._id)
  //  .then()
  //   // setIsLiked(true);
  // }

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

  const handleUpdateUser = (name, about) => {
    console.log("name", name, "about", about);

    api
      .editProfile(name, about)
      .then((res) => {
        setCurrentUser({ name: res.name, aboutMe: res.about });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  // function handleSubmit(e) {
  //   // Prevent the browser from navigating to the form address
  //   e.preventDefault();

  //   // Pass the values of the managed components to the external handler
  //   onUpdateUser({
  //     name,
  //     about: about,
  //   });
  // }

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
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          // onUpdateUser={handleUpdateUser}
          onUpdateUser={handleUpdateUser}
        />

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
