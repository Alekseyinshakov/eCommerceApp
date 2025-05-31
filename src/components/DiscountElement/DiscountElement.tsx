import { apiRoot } from '@api/apiClient'
import { useEffect, useState } from 'react'
import styles from './DiscountElement.module.scss'

const DiscountElement = ({ discountId }: { discountId: string }) => {
  const [discountName, setDiscountName] = useState('')
  const [discountValue, setDiscountValue] = useState<number | null>(null)

  useEffect(() => {
    const getDataDiscount = async () => {
      try {
        const discountRes = await apiRoot
          .productDiscounts()
          .withId({ ID: discountId })
          .get()
          .execute()

        setDiscountName(discountRes.body?.name?.['en-US'] || '')

        const value = discountRes.body?.value
        if (
          value &&
          'permyriad' in value &&
          typeof value.permyriad === 'number'
        ) {
          setDiscountValue(value.permyriad / 100)
        } else {
          setDiscountValue(null)
        }
      } catch (err) {
        console.error('Error discount response:', err)
      }
    }
    getDataDiscount()
  }, [discountId])
  return (
    <div className={styles.discountWrapper}>
      <p>{discountName}</p>
      <p>{discountValue !== null ? `${discountValue}%` : ''}</p>
    </div>
  )
}

export default DiscountElement
