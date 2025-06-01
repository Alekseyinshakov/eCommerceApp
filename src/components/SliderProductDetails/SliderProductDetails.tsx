import { useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from './SliderProductDetails.module.scss'
import '@assets/styles/global.scss'

type ImageSlider = {
  images: Array<string>
}

const SliderProductDetails = ({ images }: ImageSlider) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  return (
    <div className={styles.productSlider}>
      <Swiper
        className="slider"
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {images.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt={`Slide ${index + 1}`}
              onClick={() => {
                setSelectedIndex(index)
                setIsOpen(true)
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        direction="vertical"
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="sliderThumbs"
      >
        {images.map((url, index) => (
          <SwiperSlide key={index}>
            <img src={url} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={images.map((src) => ({ src }))}
        index={selectedIndex}
      />
    </div>
  )
}

export default SliderProductDetails
