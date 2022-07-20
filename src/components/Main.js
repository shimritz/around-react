import React from "react";
import profilePhoto from "../images/profile_photo-image(1).jpg";
import { api } from "../utils/api";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
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
        {/* <button onClick={onCardClick}>test</button> */}
        {/* doing array loop and creating cards by temple */}

        {cards.map((card) => {
          const { name, likes, link } = card;
          //   console.log("name", { name });

          //   <template id="card-template">
          return (
            <article className="card">
              <img
                className="card__image"
                src={link}
                alt="a picture of a valley"
              />
              <button
                type="button"
                className="card_close card__bin-btn"
                aria-label="delete button"
              ></button>
              <div className="card__footer">
                <h2 className="card__name">{name}</h2>
                <div className="card__likes">
                  <button
                    type="button"
                    className="card__like-btn"
                    aria-label="like button"
                  ></button>
                  <div className="card__likes-count">{likes.length}</div>
                </div>
              </div>
            </article>
            //   </template>;
          );
        })}
      </section>
    </main>
  );
}

export default Main;
