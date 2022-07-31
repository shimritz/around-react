import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ name, likes, link, owner, selectedCard, onCardClick }) {
  function handleClick() {
    onCardClick({ name, link, likes });
  }
  const currentUser = React.useContext(CurrentUserContext);
  // Checking if the current user is the owner of the current card
  const isOwn = owner._id === currentUser._id;
  console.log(isOwn);

  // Creating a variable which you'll then set in `className` for the delete button
  const cardDeleteButtonClassName = `card__bin-btn ${
    isOwn ? "card__bin-btn" : "card__bin-btn_hidden"
  }`;

  return (
    <article className="card">
      <img
        className="card__image"
        src={link}
        alt="a picture of a valley"
        onClick={handleClick}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
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
  );
}

export default Card;
