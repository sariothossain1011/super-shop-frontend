import React, { Fragment } from 'react'
import SwiperSlider from '../../components/masterLayout/SwiperSlider'
import Products from '../../components/users/Products'




const HomePage = () => {
  return (
    <Fragment>
      <SwiperSlider/>
      <Products/>
    </Fragment>
  )
}

export default HomePage