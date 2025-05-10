import { Link } from 'react-router-dom'
import styles from './HomePage.module.scss'

const { wrapper, content, subtitle, title, text, imgWrapper } = styles

export function HomePage() {
  return (
    <div className={wrapper}>
      <div className={content}>
        <h2 className={subtitle}>Welcome to GreenShop</h2>
        <h1 className={title}>
          Let’s Make a Better <span>Planet</span>
        </h1>
        <div className={text}>
          We are an online plant shop offering a wide range of cheap and trendy
          plants. Use our plants to create an unique Urban Jungle. Order your
          favorite plants!
        </div>
        <Link className="button" to="/shop">
          SHOP NOW
        </Link>
      </div>

      <div className={imgWrapper}>
        <img src="images/main-img.png" alt="plant" />
      </div>
    </div>
  )
}
