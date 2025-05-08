import { RegisterNav } from '@components/RegisterNav/RegisterNav'
import { RegisterAlt } from '@components/RegisterAlt/RegisterAlt'

import './AuthForm.scss'
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
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
            />
            <div className="log-in__forgetful">Forgot password?</div>

            <button className="log-in__button" type="submit">
              Sign In
            </button>
          </form>
        </div>
        <RegisterAlt />
      </div>
    </main>
  )
}
