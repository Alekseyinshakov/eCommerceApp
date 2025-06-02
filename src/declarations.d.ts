declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.svg' {
  const content: string
  export default content
}

declare module 'swiper/css'
declare module 'swiper/css/navigation'
declare module 'swiper/css/pagination'
