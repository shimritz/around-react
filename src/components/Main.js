import React from "react";

import { api } from "../utils/api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onTrashBinClick,
  onCardDelete,
}) {
  const [cards, setCards] = React.useState([]);
  const currentUser = React.useContext(CurrentUserContext);

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

  return (
    <main className="page__content">
      <section className="profile">
        <div onClick={onEditAvatarClick} className="profile__avatar-container">
          <img
            className="profile__avatar"
            // src={profilePhoto}
            src={currentUser.avatar}
            alt=""
          />
        </div>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.name}</h1>

            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfileClick}
            ></button>
          </div>
          <p className="profile__about-me">{currentUser.aboutMe}</p>
        </div>

        <button
          type="button"
          className="profile__add-button"
          aria-label="add-btn"
          onClick={onAddPlaceClick}
        ></button>
      </section>

      <section className="photos">
        {cards.map((card) => {
          return (
            <Card
              {...card}
              key={card._id}
              onCardClick={onCardClick}
              onTrashBinClick={onTrashBinClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
