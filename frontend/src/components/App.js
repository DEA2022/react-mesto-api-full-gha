import React from 'react';
import '../index.css'
import Header from './Header.js';
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { authorization, getToken, register } from '../utils/auth';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';



function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false)
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardIdDelete, setCardIdDelete] = React.useState('')

  const [loggedIn, setLoggedIn] = React.useState(false)
  const navigate = useNavigate();
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (loggedIn)
      Promise.all([api.getUserInfo(localStorage.getItem('jwt')), api.getInitialCards(localStorage.getItem('jwt'))])
        .then(([userInfo, initialCards]) => {
          setCards(initialCards)
          setCurrentUser(userInfo)
        })
        .catch(errorMessage => {
          console.error(`Операция не выполнена ${errorMessage}`)
        })
  }, [loggedIn])

  React.useEffect(() => {
    handleTokenCheck();
  }, [])


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }


  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({
      name: '',
      link: ''
    });
    setIsTooltipPopupOpen(false);
  }

  function closePopupsByClickOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function setStateCards(id, newCard) {
    setCards((state) => state.map((card) => (card._id === id ? newCard : card)));
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item === currentUser._id);
    if (isLiked) {
      api
        .deleteLike(card._id, localStorage.getItem('jwt'))
        .then((newCard) => {
          setStateCards(card._id, newCard);
        })
        .catch(errorMessage => {
          console.error(`Операция не выполнена ${errorMessage}`)
        })
    } else {
      api
        .addLike(card._id, localStorage.getItem('jwt'))
        .then((newCard) => {
          setStateCards(card._id, newCard);
        })
        .catch(errorMessage => {
          console.error(`Операция не выполнена ${errorMessage}`)
        })
    }
  };

  function handleCardDelete(cardId) {
    setCardIdDelete(cardId)
    setIsDeleteCardPopupOpen(true);
  }

  function handleSubmitCardDelete(event) {
    event.preventDefault();
    api
      .deleteCard(cardIdDelete, localStorage.getItem('jwt'))
      .then(() => {
        setCards((cards) => cards.filter(item => {
          return item._id !== cardIdDelete;
        }));
        closeAllPopups()
      })
      .catch(errorMessage => {
        console.error(`Операция не выполнена ${errorMessage}`)
      })
  };

  function handleUpdateUser(userInfo) {
    setIsLoading(true)
    api.setUserInfo(userInfo, localStorage.getItem('jwt'))
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(errorMessage => {
        console.error(`Операция не выполнена ${errorMessage}`)
      })
      .finally(() =>
        setIsLoading(false));
  }

  function handleUpdateAvatar(userInfo) {
    setIsLoading(true)
    api.updateUserAvatar(userInfo, localStorage.getItem('jwt'))
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(errorMessage => {
        console.error(`Операция не выполнена ${errorMessage}`)
      })
      .finally(() =>
        setIsLoading(false));
  }

  function handleAddPlace(data) {
    setIsLoading(true)
    api.createNewCard(data, localStorage.getItem('jwt'))
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(errorMessage => {
        console.error(`Операция не выполнена ${errorMessage}`)
      })
      .finally(() =>
        setIsLoading(false));
  }

  function handleRegisterSubmit(email, password) {
    register(email, password)
      .then(data => {
        if (data) {
          setIsInfoTooltipSuccess(true);
          navigate('/sign-in');
        }
      })
      .catch(errorMessage => {
        setIsInfoTooltipSuccess(false);
        console.error(`Регистрация не выполнена ${errorMessage}`)
      })
      .finally(() =>
        setIsTooltipPopupOpen(true));
  }

  function handleLoginSubmit(email, password) {
    authorization(email, password)
      .then(data => {
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', data.token);
          handleTokenCheck();
          navigate('/');
        }
      })
      .catch(errorMessage => {
        setIsTooltipPopupOpen(true);
        setIsInfoTooltipSuccess(false);
        console.error(`Авторизация не выполнена ${errorMessage}`)
      })
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getToken(jwt)
        .then((res) => {
          if (res) {
            setUserEmail(res.email);
            setLoggedIn(true);
            navigate("/");
          }
        })
        .catch((errorMessage) => {
          console.error(`Верификация токена не выполнена ${errorMessage}`)
        })
    }
  }

  function loggedOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header userEmail={userEmail} loggedIn={loggedIn} loggedOut={loggedOut} />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onDelete={handleCardDelete}
              cards={cards}
            />
          }
          />
          <Route path="/sign-up" element={<Register isRegister={handleRegisterSubmit} />} />
          <Route path="/sign-in" element={<Login isLogin={handleLoginSubmit} />} />
          <Route path="*" element={loggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />} />
        </Routes>

        <InfoTooltip
          name='tooltip'
          isOpen={isTooltipPopupOpen}
          onClose={closeAllPopups}
          onCloseByOverlay={closePopupsByClickOverlay}
          isTooltipSuccess={isInfoTooltipSuccess}
        />

        {loggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          textButton={isLoading ? 'Сохранение...' : 'Сохранить'}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          textButton={isLoading ? 'Сохранение...' : 'Сохранить'}
        />

        <PopupWithForm
          name='delete'
          title='Вы уверены'
          textButton='Да'
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleSubmitCardDelete}
          additionalClass='popup__title_type_agreement'
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          textButton={isLoading ? 'Создание...' : 'Создать'}
        />

        <ImagePopup
          name='image'
          isOpen={selectedCard?.link}
          card={selectedCard}
          onClose={closeAllPopups}
          additionalClass='popup__close_el_pic'
        />
      </div>
    </CurrentUserContext.Provider>
  );
}


export default App;
