import { Link } from 'react-router-dom'
import styles from './HomePage.module.scss'
import { useAuthStore } from '@store/authStore'
import DiscountCode from '@components/DiscountCodeElement/DiscountCodeElement'

const {
  homeContainer,
  content,
  subtitle,
  hello,
  title,
  text,
  imgWrapper,
  home,
} = styles

export const HomePage = () => {
  const firstName = useAuthStore((state) => state.user?.firstName)
  return (
    <section className={home}>
      <DiscountCode />
      <div className={`container ${homeContainer}`}>
        <div className={content}>
          {firstName && (
            <div className={hello}>
              <span>HELLO,</span> {firstName}!
            </div>
          )}
          <h2 className={subtitle}>Welcome to GreenShop</h2>
          <h1 className={title}>
            Let’s Make a Better <span>Planet</span>
          </h1>
          <div className={text}>
            We are an online plant shop offering a wide range of cheap and
            trendy plants. Use our plants to create an unique Urban Jungle.
            Order your favorite plants!
          </div>
          <Link className="button" to="/shop">
            SHOP NOW
          </Link>
        </div>
        <div className={imgWrapper}>
          <img src="images/main-img.png" alt="plant" width={518} height={503} />
        </div>
      </div>
    </section>
  )
}
