import { Outlet } from 'react-router-dom'
import { BreadCrumbs } from '@components/BreadCrumbs/BreadCrumbs'

const ShopLayout = () => {
  return (
    <div className="container">
      <BreadCrumbs />
      <Outlet />
    </div>
  )
}

export default ShopLayout
