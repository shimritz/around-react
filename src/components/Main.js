import React from "react";

import { api } from "../utils/api";
import Card from "./Card";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onTrashBinClick,
}) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.aboutMe);
        setUserAvatar(res.avatar);
      })
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <main className="page__content">
      <section className="profile">
        <div onClick={onEditAvatarClick} className="profile__avatar-container">
          <img
            className="profile__avatar"
            // src={profilePhoto}
            src={userAvatar}
            alt="user photo"
          />
        </div>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{userName}</h1>

            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfileClick}
            ></button>
          </div>
          <p className="profile__about-me">{userDescription}</p>
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
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
