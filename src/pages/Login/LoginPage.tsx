import { RegisterNav } from '@components/RegisterNav/RegisterNav'
import './LoginPage.scss'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
  const navigate = useNavigate()

  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/home')
  }

  return (
    <main className="login-page">
      <div className="login-block">
        <RegisterNav />
        <div className="log-in">
          <div className="log-in__hint">
            Enter your username and password to login.
          </div>
          <form
            className="log-in__form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <input name="email" type="email" required />
            <input name="password" type="password" required />
            <div className="log-in__forgetful">Forgot password?</div>

            <button className="log-in__button" type="submit">
              Sign In
            </button>
          </form>
        </div>

        <div className="log-in-alt">
          <div className="divider">
            <span className="divider__text">Or login with</span>
          </div>
          <button className="log-in-alt__button" type="submit">
            Login with Google
          </button>
          <button className="log-in-alt__button" type="submit">
            Login with Facebook
          </button>
        </div>
      </div>
    </main>
  )
}
