import styles from './ProductCart.module.scss'
const { mainBlock, img, text, nameItem, priceItem } = styles

type ProductCartProps = {
  name: string
  price: string | number
  image: string
}

export const ProductCart = ({ name, price, image }: ProductCartProps) => {
  return (
    <div className={mainBlock}>
      <img src={image} alt={name} className={img} />
      <div className={text}>
        <p className={nameItem}>{name}</p>
        <p className={priceItem}>{price} $</p>
      </div>
    </div>
  )
}
