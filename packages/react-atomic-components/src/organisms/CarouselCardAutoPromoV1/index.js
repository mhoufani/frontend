import PropTypes from 'prop-types';

import { isEmpty } from 'util-common/checker';
import { Carousel } from 'ui-core/atoms';
import { CardAutoPromo } from 'ui-core/molecules';
import ArrowLeftSVG from 'svgs/arrow-left.svg';
import ArrowRightSVG from 'svgs/arrow-right.svg';

import classes from './index.module.scss';

export const CarouselCardAutoPromoV1 = ({ carouselProps, cards }) => {
  return (
    !isEmpty(cards) &&
    (cards.length === 1 ? (
      <div className={classes.outer}>
        <CardAutoPromo {...cards[0]} />
      </div>
    ) : (
      <Carousel
        {...carouselDefaultProps}
        {...carouselProps}
        classNames={{
          carousel: classes.carousel_carousel,
          itemContainer: classes.carousel_itemContainer,
          navStepper: classes.carousel_navStepper,
          navStepperNext: classes.carousel_navStepperNext,
          navStepperPrev: classes.carousel_navStepperPrev,
        }}
      >
        {cards.map((cardProps, key) => {
          return <CardAutoPromo key={key} {...cardProps} />;
        })}
      </Carousel>
    ))
  );
};

CarouselCardAutoPromoV1.defaultProps = {
  carouselProps: {},
  cards: [],
};

CarouselCardAutoPromoV1.propTypes = {
  carouselProps: PropTypes.shape(Carousel.propTypes),
  cards: PropTypes.arrayOf(CardAutoPromo.propTypes),
};

const carouselDefaultProps = {
  autoSwipe: false,
  bodyScrollOnTouch: true,
  isSliderAlawaysFullOfSlides: true,
  navStepperPrevContent: <ArrowLeftSVG />,
  navStepperNextContent: <ArrowRightSVG />,
  nbItemsBySlide: 1,
  showNavDots: false,
  showNavStepperOnLimit: false,
};
