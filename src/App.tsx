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
    const cartData = localStorage.getItem('cart_data')
    if (cartData) {
      try {
        const parsedCartData = JSON.parse(cartData)
        fetchCartData(parsedCartData.cartId)
          .then((cart) => {
            if (cart) {
              setCart(cart)
            }
          })
          .catch((error) => {
            console.error('Error fetching cart data:', error)
          })
      } catch (error) {
        console.error('Error parsing cart data from localStorage:', error)
      }
    }
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
