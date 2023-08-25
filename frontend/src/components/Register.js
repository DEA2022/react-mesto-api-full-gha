import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";


function Register({ isRegister }) {

  const { values, handleChange } = useForm({ email: '', password: '' });

  function handleSubmit(evt) {
    evt.preventDefault();
    isRegister(values.email, values.password)
  }


  return (
    <>
      <AuthForm title="Регистрация" buttonText="Зарегистрироваться" onSubmit={handleSubmit}>
        <input
          className="authorization__field"
          id="authorization-email"
          type="email"
          name="email"
          required
          placeholder="Email"
          minLength={8}
          maxLength={30}
          value={values.email || ''}
          onChange={handleChange}
        />
        <span className="authorization-error authorization-email-error" />
        <input
          className="authorization__field"
          id="authorization-password"
          type="password"
          name="password"
          required
          placeholder="Пароль"
          minLength={6}
          maxLength={18}
          value={values.password || ''}
          onChange={handleChange}
        />
        <span className="authorization-error authorization-password-error" />
      </AuthForm>
      <p className="authorization__question">Уже зарегистрированы?{' '}
        <Link
          to="/sign-in"
          className="authorization__link">
          Войти
        </Link>
      </p>
    </>
  );
}


export default Register;