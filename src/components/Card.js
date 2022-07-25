import React from "react";

function Card({ name, likes, link, selectedCard, onCardClick }) {
  function handleClick() {
    onCardClick({ name, link, likes });
  }

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
  );
}

export default Card;
