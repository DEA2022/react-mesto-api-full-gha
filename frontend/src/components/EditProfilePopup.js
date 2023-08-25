import PopupWithForm from "./PopupWithForm"
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";

function EditProfilePopup({
  isOpen,
  onClose,
  textButton,
  onUpdateUser
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({ name: '', job: '' });

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      job: currentUser.about
    })
  }, [currentUser, isOpen]);


  function handleSubmitEditProfile(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: values.name,
      job: values.job,
    });
  }

  return (

    <PopupWithForm
      name='profile'
      title='Редактирование профиля'
      textButton={textButton}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitEditProfile}
    >
      <fieldset className="form__info">
        <input
          type="text"
          className="form__field form__field_el_name"
          id="form-name"
          name="name"
          placeholder="Введите имя"
          minLength={2}
          maxLength={40}
          required
          value={values.name || ''}
          onChange={handleChange}
        />
        <span className="form__error form-name-error" />
        <input type="text"
          className="form__field form__field_el_job"
          id="form-job"
          name="job"
          placeholder="Введите информацию о себе"
          minLength={2}
          maxLength={200}
          required
          value={values.job || ''}
          onChange={handleChange}
        />
        <span className="form__error form-job-error" />
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup
