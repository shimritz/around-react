import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import Card from "./Card";
import AddPlacePopup from "./AddPlacePopup";

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
  const [cards, setCards] = React.useState([]);

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
        setCurrentUser({
          name: res.name,
          aboutMe: res.about,
          avatar: res.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (avatar) => {
    console.log("avatar", avatar);
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          aboutMe: res.about,
          avatar: res.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  // React.useEffect(() => {
  //   api
  //     .getUserInfo()
  //     .then((res) => {
  //       setUserName(res.name);
  //       setUserDescription(res.aboutMe);
  //       setUserAvatar(res.avatar);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    console.log("currentUser", currentUser);

    console.log("cards before->", cards);
    // Send a request to the API and getting the updated card data
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        console.log("newcard", newCard);
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );

        console.log("cards after->", cards);
      })
      .catch((err) => console.log(err));

    console.log("isLiked", isLiked);
  }

  function handleCardDelete(id) {
    console.log("handleCardDelete", id);
    api
      .deleteCard(id)
      .then(() => {
        setCards((cards) =>
          cards.filter((currentCard) => currentCard._id !== id)
        );
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api
      .createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
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
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isPreviewImageOpen}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          // onUpdateUser={handleUpdateUser}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <section className="photos">
          {cards.map((card) => {
            return (
              <Card
                {...card}
                key={card._id}
                onCardClick={handleCardClick}
                // onTrashBinClick={onTrashBinClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            );
          })}
        </section>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
