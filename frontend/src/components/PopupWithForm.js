import Popup from "./Popup";

function PopupWithForm({
  additionalClass,
  name,
  title,
  children,
  textButton,
  isOpen,
  onClose,
  onSubmit
}) {

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h2 className={`popup__title ${additionalClass}`}>{title}</h2>
      <form action="#" className="form" name={name} onSubmit={onSubmit}>

        {children}

        <button className="form__submit" type="submit" aria-label={textButton}>{textButton}</button>
      </form>
      <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose} />
    </Popup>
  );
}


export default PopupWithForm;