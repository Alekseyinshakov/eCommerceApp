import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthPageText } from '@hooks/useAuthPageText'
import { validateEmail, validatePassword } from '@hooks/useFormValidators'

import { RegisterNav } from '@components/RegisterNav/RegisterNav'
import FormInput from '@components/FormInput/FormInput'

import { loginCustomer } from '@api/auth'
import { useNotification } from '@components/Notification/NotifficationContext'

import styles from './AuthForm.module.scss'
import { useAuthStore } from '@store/authStore'
import { useCartStore } from '@store/cartStore'
import { fetchCartData } from '@api/fetchCartData'
import { mergeCarts } from '@api/mergeCarts'

const { main, authPage, authBlock, auth, authHint, form, button } = styles

export const LoginPage = () => {
  const setUser = useAuthStore((state) => state.setUser)

  const navigate = useNavigate()
  const { submitText } = useAuthPageText()
  const { setNotification } = useNotification()
  const { cart, setCart } = useCartStore()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    }

    setErrors(newErrors)

    const hasErrors = Object.values(newErrors).some(Boolean)
    if (hasErrors) return

    try {
      const cartData = localStorage.getItem('cart_data')
      const cartDataParsed = cartData ? JSON.parse(cartData) : null
      const anonymousCart = cart
      const customer = await loginCustomer(formData.email, formData.password)

      if (customer) {
        setUser(customer)
      }
      const userCart = await fetchCartData(
        cartDataParsed && cartDataParsed.cartId ? cartDataParsed.cartId : null
      )
      if (anonymousCart && userCart) {
        const mergedCart = await mergeCarts(anonymousCart, userCart)
        setCart(mergedCart)
        localStorage.setItem(
          'cart_data',
          JSON.stringify({
            cartId: mergedCart.id,
            versionCart: mergedCart.version,
          })
        )
      }
      if (userCart && !anonymousCart) {
        setCart(userCart)
        localStorage.setItem(
          'cart_data',
          JSON.stringify({
            cartId: userCart.id,
            versionCart: userCart.version,
          })
        )
      }

      navigate('/home')
    } catch (err) {
      console.error(err)
      setNotification('Invalid email or password')
      setErrors({
        email: 'Invalid email or password',
        password: 'Invalid email or password',
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }))
    } else if (name === 'password') {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }))
    }
  }

  return (
    <main className={main}>
      <div className={authPage}>
        <div className={authBlock}>
          <RegisterNav />
          <div className={auth}>
            <div className={authHint}>
              Enter your email and password to login.
            </div>
            <form className={form} autoComplete="off" onSubmit={handleSubmit}>
              <FormInput
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <FormInput
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                className="passwordText"
              />
              <button className={button} type="submit">
                {submitText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
