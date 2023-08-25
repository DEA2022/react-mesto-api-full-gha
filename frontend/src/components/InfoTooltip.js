import '../index.css'
import successIcon from '../images/union.svg';
import failIcon from '../images/UnionFail.svg';
import Popup from './Popup';

function InfoTooltip({
  name,
  isOpen,
  onClose,
  isTooltipSuccess
}) {

  const infoMessage = isTooltipSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';
  const infoIcon = isTooltipSuccess ? successIcon : failIcon;

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <button type="button" aria-label="Закрытие попапа" className="popup__close" onClick={onClose} ></button>
      <img className="popup__info-icon" src={infoIcon} alt="иконка регистрации" />
      <h2 className="popup__info-message">{infoMessage}</h2>
    </Popup >

  )
}

export default InfoTooltip