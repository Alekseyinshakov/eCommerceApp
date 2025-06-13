import { Outlet } from 'react-router-dom'
import '@assets/styles/global.scss'
import Header from '@components/Header/Header'
import Footer from '@components/Footer/Footer'
import { fetchCartData } from '@api/fetchCartData'
import { NotificationProvider } from '@components/Notification/UseNotification'
import { useEffect } from 'react'
import { useCartStore } from '@store/cartStore'

const App = () => {
  const { setCart } = useCartStore()

  useEffect(() => {
    const loadCart = async () => {
      const cartData = localStorage.getItem('cart_data')
      if (cartData) {
        try {
          const parsedCartData = JSON.parse(cartData)
          const cart = await fetchCartData(parsedCartData.cartId)
          if (cart) {
            setCart(cart)
          }
        } catch (error) {
          console.error('Error loading cart data:', error)
        }
      }
    }

    loadCart()
  }, [setCart])

  return (
    <NotificationProvider>
      <div className="layout">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </NotificationProvider>
  )
}

export default App
