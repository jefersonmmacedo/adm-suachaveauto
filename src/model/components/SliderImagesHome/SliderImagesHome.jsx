  import Carousel, { slidesToShowPlugin  } from '@brainhubeu/react-carousel';
  import '@brainhubeu/react-carousel/lib/style.css';
import "./sliderImagesHome.css"
  
  
  
  export function SliderImagesHome({images}) {
      return (
        <>
          <Carousel
          plugins={[
              'infinite',
              'centered',
              {
              resolve: slidesToShowPlugin,
              options: {
                addArrowClickHandler: true,
              numberOfSlides: 6
              }
              },
          ]}
          breakpoints={{
            950: {
              plugins: [
                  'infinite',
                  'centered',
               {
                 resolve: slidesToShowPlugin,
                 options: {
                  numberOfSlides: 4
                 }
               }]},
            800: {
              plugins: [
                  'infinite',
                  'centered',
               {
                 resolve: slidesToShowPlugin,
                 options: {
                  numberOfSlides: 3
                 }
               }]},
            650: {
              plugins: [
                  'infinite',
                  'centered',
               {
                 resolve: slidesToShowPlugin,
                 options: {
                  numberOfSlides: 2
                 }
               }]}
              }}
          >

            {images.map((image) => {
                return (
                    <img src={image.link} width="100%" height="100%" onClick={handleOpenModal} key={image.id}/>
                )
            })}

          </Carousel>
          </>
        )
  }