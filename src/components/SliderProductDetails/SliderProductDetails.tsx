import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type ImageSlider = {
  images: Array<string>
}

const SliderProductDetails = ({ images }: ImageSlider) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView={1}
    >
      {images.map((url, index) => (
        <SwiperSlide key={index}>
          <img src={url} alt={`Slide ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SliderProductDetails
