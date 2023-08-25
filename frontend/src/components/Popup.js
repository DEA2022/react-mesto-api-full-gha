import { usePopupsClose } from "../hooks/usePopupClose";

function Popup({
  name,
  isOpen,
  onClose,
  children,
  additionalClass
}) {

  usePopupsClose(isOpen, onClose);


  return (
    <div className={`popup popup_type_${name}` + (isOpen && ' popup_opened')}>
      <div className={`popup__container popup__container_type_${name}`}>

        {children}

        <button className={`popup__close ${additionalClass}`} type="button" aria-label="Закрыть" onClick={onClose} />
      </div>
    </div >
  );
}


export default Popup;

