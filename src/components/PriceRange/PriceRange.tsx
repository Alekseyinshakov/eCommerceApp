/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Range, getTrackBackground } from 'react-range'
import styles from './PriceRange.module.scss'
import { useProductStore } from '@store/productStore'

const STEP = 1
const MIN = 0
const MAX = 100

export const PriceRange: React.FC = () => {
  const [tempValues, setTempValues] = useState<number[]>([0, 100])
  const priceRange = useProductStore((state) => state.priceRange)

  const setPriceRange = useProductStore((state) => state.setPriceRange)

  useEffect(() => {
    setTempValues(priceRange)
  }, [priceRange])

  const handleFinalChange = (values: number[]) => {
    if (values.length === 2) {
      setPriceRange([values[0], values[1]])
    }
  }

  return (
    <fieldset className={styles.priceRange}>
      <legend className={styles.legend}>Price Range</legend>
      <div className={styles.rangeWrapper}>
        <Range
          values={tempValues}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => setTempValues(values)}
          onFinalChange={handleFinalChange}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              className={styles.trackContainer}
            >
              <div
                ref={props.ref}
                className={styles.track}
                style={{
                  background: getTrackBackground({
                    values: tempValues,
                    colors: ['#d7eadb', '#46a358', '#d7eadb'],
                    min: MIN,
                    max: MAX,
                  }),
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => {
            const { key, ...restProps } = props
            return (
              <div key={key} {...restProps} className={styles.thumb}>
                <div className={styles.thumbValue}></div>
                <div
                  className={styles.thumbIndicator}
                  style={{
                    backgroundColor: isDragged ? '#46a358' : '#CCC',
                  }}
                />
              </div>
            )
          }}
        />
        <div className={styles.priceValues}>
          <span>Price: ${tempValues[0]}</span> - <span>${tempValues[1]}</span>
        </div>
      </div>
    </fieldset>
  )
}

export default PriceRange
