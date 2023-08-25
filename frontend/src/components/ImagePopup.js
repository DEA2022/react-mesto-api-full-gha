import Popup from "./Popup";

function ImagePopup({ card, onClose, name, isOpen, additionalClass }) {


  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose} additionalClass={additionalClass}>
      <figure className="popup__figure">
        <img src={card.link} alt={card.name} className="popup__img" />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </Popup>
  );
}


export default ImagePopup;