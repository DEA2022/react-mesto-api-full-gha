import '../index.css'
import AuthForm from './AuthForm';
import { useForm } from '../hooks/useForm';


function Login({ isLogin }) {
  const { values, handleChange } = useForm({ email: '', password: '' });


  function handleSubmit(evt) {
    evt.preventDefault();
    isLogin(values.email, values.password)
  }

  return (
    <AuthForm title="Вход" buttonText="Войти" onSubmit={handleSubmit}>
      <input
        className="authorization__field"
        id="authorization-email"
        type="email"
        name="email"
        required
        placeholder="Email"
        minLength={8}
        maxLength={30}
        onChange={handleChange}
        value={values.email || ''}
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
        onChange={handleChange}
        value={values.password || ''}
      />
      <span className="authorization-error authorization-password-error" />
    </AuthForm>
  );
}


export default Login;