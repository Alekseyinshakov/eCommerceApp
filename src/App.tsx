import { Outlet } from 'react-router-dom'
import '@assets/styles/global.scss'
import Header from '@components/Header/Header'
import Footer from '@components/Footer/Footer'
import { fetchCartData } from '@api/fetchCartData'
import { NotificationProvider } from '@components/Notification/UseNotification'
import { useEffect } from 'react'
import { useCartStore } from '@store/cartStore'
import DiscountCode from '@components/DiscountCodeElement/DiscountCodeElement'

const App = () => {
  const { setCart, setLoading } = useCartStore()

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true)
      const cartData = localStorage.getItem('cart_data')
      if (cartData) {
        try {
          const parsedCartData = JSON.parse(cartData)
          const cart = await fetchCartData(parsedCartData.cartId)
          if (cart) setCart(cart)
        } catch (e) {
          console.error(e)
        }
      }
      setLoading(false)
    }

    loadCart()
  }, [setCart, setLoading])

  return (
    <NotificationProvider>
      <div className="layout">
        <Header />
        <DiscountCode />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </NotificationProvider>
  )
}

export default App
