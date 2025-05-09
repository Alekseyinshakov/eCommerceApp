import { useNavigate } from 'react-router-dom'
import { useAuthPageText } from '@hooks/useAuthPageText'

import { RegisterNav } from '@components/RegisterNav/RegisterNav'
import { RegisterAlt } from '@components/RegisterAlt/RegisterAlt'
import FormInput from '@components/FormInput/FormInput'

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
                <FormInput
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  required
                />

                <FormInput
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  required
                />
              </div>

              <FormInput
                name="email"
                type="email"
                placeholder="Email (e.g., example@email.com)"
                required
              />

              <FormInput
                name="password"
                type="password"
                placeholder="Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)"
                required
              />

              <FormInput
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
              />

              <FormInput
                name="dob"
                type="date"
                placeholder="Date of Birth"
                required
              />

              <div className={inputGroupTwo}>
                <div className={groupOne}>
                  <FormInput
                    name="street"
                    type="text"
                    placeholder="Street Address"
                    required
                  />

                  <FormInput
                    name="city"
                    type="text"
                    placeholder="City"
                    required
                  />
                </div>

                <div className={groupOne}>
                  <FormInput
                    name="postalCode"
                    type="text"
                    placeholder="Postal Code"
                    required
                  />

                  <FormInput
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
                    {/* you can expand the list */}
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
