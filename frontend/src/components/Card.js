import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ cardData, onCardClick, onCardLike, onDelete }) {
  const currentUser = useContext(CurrentUserContext)

  const isLiked = cardData.likes.some(item => item === currentUser._id);

  const cardLikeButtonClassName = (
    `photo__icon ${isLiked && 'photo__icon_active'}`
  );;

  const handleLikeClick = () => {
    onCardLike(cardData);
  };

  return (
    <li className="photo__card">
      <img
        className="photo__item"
        src={cardData.link}
        alt={cardData.name}
        onClick={() => onCardClick({ name: cardData.name, link: cardData.link })}
      />
      {cardData.owner === currentUser._id && <button className="photo__trash" type="button" aria-label="Корзина" onClick={() => onDelete(cardData._id)} />}
      <div className="photo__wrap">
        <h2 className="photo__name">{cardData.name}</h2>
        <div className="photo__likes">
          <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" onClick={handleLikeClick} />
          <div className="photo__counter">{cardData.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;