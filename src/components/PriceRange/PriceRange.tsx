import { useState, useEffect, ReactNode } from 'react'
import { Range, getTrackBackground } from 'react-range'
import styles from './PriceRange.module.scss'
import { useProductStore } from '@store/productStore'

const STEP = 1
const MIN = 0
const MAX = 100

type RenderTrackType = NonNullable<
  Parameters<React.ComponentProps<typeof Range>['renderTrack']>[0]
>

type RenderThumbType = NonNullable<
  Parameters<React.ComponentProps<typeof Range>['renderThumb']>[0]
>

const renderTrack = (
  tempValues: Array<number>,
  props: RenderTrackType['props'],
  children: ReactNode
) => (
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
          min: 0,
          max: 100,
        }),
      }}
    >
      {children}
    </div>
  </div>
)

const renderThumb = (props: RenderThumbType['props'], isDragged: boolean) => {
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
}

export const PriceRange: React.FC = () => {
  const [tempValues, setTempValues] = useState<number[]>([MIN, MAX])
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
          renderTrack={({ props, children }) =>
            renderTrack(tempValues, props, children)
          }
          renderThumb={({ props, isDragged }) => renderThumb(props, isDragged)}
        />
        <div className={styles.priceValues}>
          <span>Price: ${tempValues[0]}</span> - <span>${tempValues[1]}</span>
        </div>
      </div>
    </fieldset>
  )
}

export default PriceRange
