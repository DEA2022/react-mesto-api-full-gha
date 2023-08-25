import React, { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onDelete
}) {

  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="main">
      <section className="profile main__profile">
        <div className="profile__wrapper">
          <button className="profile__button-avatar" type="button" onClick={onEditAvatar}>
            <img className="profile__photo" src={currentUser.avatar} alt="Фото профиля" />
          </button>
          <div className="profile__common">
            <div className="profile__name-content">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button className="profile__edit" type="button" onClick={onEditProfile} aria-label="Редактирование профиля">
              </button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__button" type="button" onClick={onAddPlace} aria-label="Добавление карточки">
        </button>
      </section>
      <section className="photo page__photo" aria-label="Фото посещенных мест">
        <ul className="photo__grid">
          {cards.map(item => {
            return (
              <Card
                cardData={item}
                key={item._id}
                onCardClick={onCardClick}
                onDelete={onDelete}
                onCardLike={onCardLike} />)
          })}
        </ul>
      </section>
    </main>


  );
}

export default Main;