import { useNavigate } from 'react-router-dom'

import { RegisterNav } from '@components/RegisterNav/RegisterNav'
import { RegisterAlt } from '@components/RegisterAlt/RegisterAlt'

import styles from './AuthForm.module.scss'

const { authPage, authBlock, logIn, loginHint, form, button } = styles

export function SignUpPage() {
  const navigate = useNavigate()

  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/home')
  }

  return (
    <main className={authPage}>
      <div className={authBlock}>
        <RegisterNav />
        <div className={logIn}>
          <div className={loginHint}>
            Enter your username and password to login.
          </div>
          <form className={form} autoComplete="off" onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Username" required />
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
            <input
              name="password"
              type="password"
              placeholder="Confirm password"
              required
            />

            <button className={button} type="submit">
              Sign In
            </button>
          </form>
        </div>
        <RegisterAlt />
      </div>
    </main>
  )
}
