import '../index.css'

function AuthForm({ title, buttonText, children, onSubmit }) {

  return (

    <div className="authorization">
      <h3 className="authorization__title">{title}</h3>
      <form className="authorization__form" onSubmit={onSubmit}>
        <fieldset className="authorization__fieldset">
          {children}
        </fieldset>
        <button type="submit" className="authorization__button" aria-label="Войти">{buttonText}</button>
      </form>
    </div>
  )
}

export default AuthForm