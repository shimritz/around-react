import React from "react";
import profilePhoto from "../images/profile_photo-image(1).jpg";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
}) {
  return (
    <main className="page__content">
      <section className="profile">
        <div onClick={onEditAvatarClick} className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={profilePhoto}
            alt="user photo"
          />
        </div>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name"></h1>

            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfileClick}
            ></button>
          </div>
          <p className="profile__about-me">aboutMe</p>
        </div>

        <button
          type="button"
          className="profile__add-button"
          aria-label="add-btn"
          onClick={onAddPlaceClick}
        ></button>
      </section>

      <section className="photos">
        <button onClick={onCardClick}>test</button>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
      </section>
    </main>
  );
}

export default Main;
