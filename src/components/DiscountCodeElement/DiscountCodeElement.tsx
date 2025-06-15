import { useEffect, useState } from 'react'
import styles from './DiscountCodeElement.module.scss'
import { apiRoot } from '@api/apiClient'
import { useDiscountCodeStore } from '@store/discountCodeStore'

type ActiveCodeDate = {
  validUntil: string | null
  codeDescription: string | null
}

const DiscountCode = () => {
  const { activeCode, setActiveCode } = useDiscountCodeStore()
  const [activeCodeDate, setActiveCodeDate] = useState<ActiveCodeDate>({
    validUntil: null,
    codeDescription: null,
  })

  useEffect(() => {
    const fetchDiscountCode = async () => {
      try {
        const response = await apiRoot
          .discountCodes()
          .withKey({ key: 'SUMMER15' })
          .get()
          .execute()
        const code = response.body.code
        const validUntil = response.body.validUntil || null
        const description = response.body.description?.['en-US'] || null
        setActiveCodeDate({
          validUntil,
          codeDescription: description,
        })
        setActiveCode(code)
      } catch (error) {
        console.error('Discount code not available:', error)
      }
    }
    fetchDiscountCode()
  }, [setActiveCode])
  return (
    <div className={styles.wrapper}>
      <p className={styles.code}>{activeCode ?? 'Promotion not available'}</p>
      <p className={styles.conditions}>
        {activeCodeDate.codeDescription} Valid on all purchases until{' '}
        {new Date(activeCodeDate.validUntil ?? '00:00').toLocaleDateString(
          'en-GB'
        )}
      </p>
    </div>
  )
}

export default DiscountCode
