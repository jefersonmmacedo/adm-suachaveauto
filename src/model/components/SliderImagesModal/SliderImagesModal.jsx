  import Carousel, { slidesToShowPlugin  } from '@brainhubeu/react-carousel';
  import '@brainhubeu/react-carousel/lib/style.css';

  
  
  
  export function SliderImagesModal({images}) {
    console.log(images)
      return (
          <Carousel
          plugins={[
              'infinite',
              'centered',
              'arrows',
              {
              resolve: slidesToShowPlugin,
              options: {
                addArrowClickHandler: true,
              numberOfSlides: 1
              }
              },
          ]}
          breakpoints={{
            650: {
              plugins: [
                  'infinite',
               {
                 resolve: slidesToShowPlugin,
                 options: {
                  numberOfSlides: 1
                 }
               }]}
              }}
          >

            {images.map((image) => {
                return (
                    <img src={image.link} width="100%" height="100%" key={image.id}/>
                )
            })}
          </Carousel>
        )
  }