import { useNavigate } from 'react-router-dom'
import { useAuthPageText } from '@hooks/useAuthPageText'

import { RegisterNav } from '@components/RegisterNav/RegisterNav'
import { RegisterAlt } from '@components/RegisterAlt/RegisterAlt'

import styles from './AuthForm.module.scss'

const {
  main,
  authPage,
  authBlock,
  auth,
  authHint,
  formSignUp,
  button,
  inputGroup,
  groupOne,
  inputGroupTwo,
} = styles

export function SignUpPage() {
  const navigate = useNavigate()
  const { submitText } = useAuthPageText()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
              Enter your details to create an account.
            </div>
            <form
              className={formSignUp}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className={inputGroup}>
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  required
                />
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  required
                />
              </div>

              <input
                name="email"
                type="email"
                placeholder="Email (e.g., example@email.com)"
                required
              />

              <input
                name="password"
                type="password"
                placeholder="Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)"
                required
              />

              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
              />

              <input
                name="dob"
                type="date"
                placeholder="Date of Birth"
                required
              />

              <div className={inputGroupTwo}>
                <div className={groupOne}>
                  <input
                    name="street"
                    type="text"
                    placeholder="Street Address"
                    required
                  />

                  <input name="city" type="text" placeholder="City" required />
                </div>

                <div className={groupOne}>
                  <input
                    name="postalCode"
                    type="text"
                    placeholder="Postal Code"
                    required
                  />

                  <input
                    name="country"
                    type="text"
                    placeholder="Country"
                    required
                    list="country-list"
                  />
                  <datalist id="country-list">
                    <option value="Canada" />
                    <option value="United States" />
                    <option value="Ukraine" />
                    <option value="Germany" />
                    <option value="France" />
                    {/* можна розширити список */}
                  </datalist>
                </div>
              </div>

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
