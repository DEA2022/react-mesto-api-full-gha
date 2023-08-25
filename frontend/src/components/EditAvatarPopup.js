import PopupWithForm from "./PopupWithForm"
import React, { useEffect, useRef } from "react";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  additionalClass,
  textButton
}) {

  const avatarRef = useRef();

  function handleSubmitEditAvatar(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      src: avatarRef.current.value,
    })
  }

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (

    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      additionalClass={additionalClass}
      textButton={textButton}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitEditAvatar}
    >
      <fieldset className="form__info">
        <input
          type="url"
          className="form__field form__field_el_webcite"
          id="form-src"
          name="src"
          placeholder="Ссылка на картинку"
          required
          ref={avatarRef}
        />
        <span className="form__error form-src-error" />
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
