import React from "react";
import profilePhoto from "../images/profile_photo-image(1).jpg";

function Main() {
  return (
    <main className="page__content">
      <section className="profile">
        <div
          onClick={handleEditAvatarClick}
          className="profile__avatar-container"
        >
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
              onClick={handleEditProfileClick}
            ></button>
          </div>
          <p className="profile__about-me">aboutMe</p>
        </div>

        <button
          type="button"
          className="profile__add-button"
          aria-label="add-btn"
          onClick={handleAddPlaceClick}
        ></button>
      </section>

      <section className="photos"></section>
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
      <div>test</div>
    </main>
  );
  function handleEditAvatarClick() {
    console.log("kokoko");
    const avatarChangePopup = document.querySelector(
      ".modal_type_avatar-change"
    );
    avatarChangePopup.classList.add("modal_open");
  }
  function handleEditProfileClick() {
    console.log("EditprofileEvent");
    const avatarChangePopup = document.querySelector(".modal_type_profile");
    avatarChangePopup.classList.add("modal_open");
  }
  function handleAddPlaceClick() {
    console.log("ADDprofileEvent");
    const avatarChangePopup = document.querySelector(".modal_type_add-card");
    avatarChangePopup.classList.add("modal_open");
  }
}

export default Main;
