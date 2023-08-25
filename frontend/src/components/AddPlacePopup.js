import PopupWithForm from "./PopupWithForm"
import { useEffect } from "react"
import { useForm } from "../hooks/useForm";

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  textButton
}) {

  const { values, handleChange, setValues } = useForm({ place: '', url: '' });

  function handleSubmitAddPlace(evt) {
    evt.preventDefault();

    onAddPlace({
      place: values.place,
      url: values.url
    })
  }

  useEffect(() => {
    setValues('')
  }, [isOpen]);

  return (
    <PopupWithForm
      name='cards'
      title='Новое место'
      textButton={textButton}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitAddPlace}
    >
      <fieldset className="form__info">
        <input
          type="text"
          className="form__field form__field_el_place"
          id="form-place"
          name="place"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required
          value={values.place || ''}
          onChange={handleChange}

        />
        <span className="form__error form-place-error" />
        <input
          type="url"
          className="form__field form__field_el_webcite"
          id="form-url"
          name="url"
          placeholder="Ссылка на картинку"
          required
          value={values.url || ''}
          onChange={handleChange}
        />
        <span className="form__error form-url-error" />
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup