import { PropTypes } from 'prop-types';
import { Carousel, CarouselDot, Picture } from 'ui-core/atoms';
import { CardImg } from 'ui-core/molecules';

import classes from './index.module.scss';

export const CarouselCardImgV1 = ({ cards }) => {
  return (
    <Carousel
      dots={CarouselDot}
      classNames={{
        itemContainer: classes.itemContainer,
        dots: classes.dots,
      }}
      responsive={{
        1250: { nbItemsBySlide: 3 },
        767: { nbItemsBySlide: 2 },
      }}
      bodyScrollOnTouch
      isSliderAlawaysFullOfSlides
      autoSwipe={false}
      showDotsNumber={false}
      showNavStepper={false}
    >
      {cards.map(
        ({ title, subTitle, image: { src } = {} }, index) => {
          return (
            <CardImg
              key={index}
              title={title}
              subTitle={subTitle}
              classNames={{
                container: classes.cardContainer,
                content: classes.cardContent,
              }}
              img={
                <Picture
                  src={src}
                  classNames={{
                    img: classes.img,
                    image: classes.imgContainer,
                  }}
                />
              }
            />
          );
        }
      )}
    </Carousel>
  );
};

CarouselCardImgV1.propTypes = {
  cards: PropTypes.array,
};

CarouselCardImgV1.defaultProps = {
  cards: [],
};
