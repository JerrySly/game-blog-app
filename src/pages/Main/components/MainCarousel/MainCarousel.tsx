import { CommonProps } from '../../../../common/props'
import { AppCarouselItem } from '../../../../store/common/type'
import './MainCarousel.scss'
import { useState } from 'react'
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';

interface MainCarouselI {
  items: Array<AppCarouselItem>
}

export const MainCarousel = (props: MainCarouselI & CommonProps) => {
  const [slideIndex, setSlideIndex] = useState(0);

  return (
    <MDBCarousel showIndicators showControls fade>
      {
        props.items.map((x, index) => 
            <MDBCarouselItem
              className='w-100 d-block'
              itemId={index}
            >
              <img src={x.img} className='slide__img' />
            </MDBCarouselItem>
        )
      }
    </MDBCarousel>
  )
}