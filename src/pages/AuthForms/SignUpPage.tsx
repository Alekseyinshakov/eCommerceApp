import { useNavigate } from 'react-router-dom'
import { useAuthPageText } from '@hooks/useAuthPageText'

import { RegisterNav } from '@components/RegisterNav/RegisterNav'
import { RegisterAlt } from '@components/RegisterAlt/RegisterAlt'

import styles from './AuthForm.module.scss'

const { main, authPage, authBlock, auth, authHint, form, button } = styles

export function SignUpPage() {
  const navigate = useNavigate()
  const { submitText } = useAuthPageText()

  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/home')
  }

  return (
    <main className={main}>
      <div className={authPage}>
        <div className={authBlock}>
          <RegisterNav />
          <div className={auth}>
            <div className={authHint}>
              Enter your email and password to register.
            </div>
            <form
              className={form}
              autoComplete="off"
              onSubmit={handleSubmit}
              role="form"
            >
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
                {submitText}
              </button>
            </form>
          </div>
          <RegisterAlt />
        </div>
      </div>
    </main>
  )
}
