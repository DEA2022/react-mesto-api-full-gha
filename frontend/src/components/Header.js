import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg'
import '../index.css'
import { useEffect, useState } from 'react';


function Header({ loggedOut, userEmail, loggedIn }) {
  const { pathname } = useLocation()
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)

  useEffect(() => { setIsBurgerMenuOpen(false) }, [loggedIn])
  function handleBurgerMenuClick() {
    setIsBurgerMenuOpen(!isBurgerMenuOpen)
  }

  function closeMenu() {
    setIsBurgerMenuOpen(false)
  }

  function renderBurger() {
    return isBurgerMenuOpen
      ? <div className='header__burger-close' onClick={closeMenu} />
      : <button className='header__burger' onClick={handleBurgerMenuClick}>
        <div className='header__burger-button' />
      </button>
  }

  return (
    <header className={`header page__header ${isBurgerMenuOpen && 'header_opened'}`}>
      <img className="header__logo" src={logo} alt="Место - Россия" />

      {loggedIn && renderBurger()}

      {loggedIn
        ? <div className={`header__user ${isBurgerMenuOpen && 'header__user_opened'}`}>
          <p className="header__user-email">email: {userEmail}</p>
          <Link className="header__link header__link_type_logout" to='/sign-in' onClick={loggedOut}>Выйти</Link>
        </div>
        : pathname === "/sign-up"
          ? <Link to='/sign-in' className="header__link">Войти</Link>
          : <Link to='/sign-up' className="header__link">Регистрация</Link>
      }

    </header >
  );
}

export default Header;