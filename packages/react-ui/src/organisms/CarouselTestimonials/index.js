import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import { isEmpty } from 'util-common/checker';
import { Carousel, CarouselDot } from 'ui-core/atoms';
import { TestimonialCard } from 'ui-core/molecules';

import classes from './index.module.scss';

export const CarouselTestimonials = ({
  carousel: carouselProps,
  classNames,
  testimonials,
}) => {
  return (
    <div className={cs(classes.container, classNames.container)}>
      <Carousel
        {...carouselDefaultProps}
        {...carouselProps}
        classNames={{
          trackOuter: classes.carousel__trackOuter,
          trackInner: classes.carousel__trackInner,
          itemContainer: classes.carousel__itemContainer,
        }}
      >
        {!isEmpty(testimonials) &&
          testimonials.map((testimonial, key) => {
            return (
              <TestimonialCard
                key={key}
                textEllipseOnly={false}
                readMoreLimitCharacters={150}
                {...testimonial}
                classNames={{
                  testimonialCard: classes.testimonialCard,
                }}
              />
            );
          })}
      </Carousel>
    </div>
  );
};

CarouselTestimonials.propTypes = {
  carousel: PropTypes.shape(Carousel.propTypes),
  classNames: PropTypes.shape({
    container: classNameType,
  }),
  testimonials: PropTypes.arrayOf(TestimonialCard.propTypes),
};

CarouselTestimonials.defaultProps = {
  carousel: {},
  classNames: {},
  testimonials: [],
};

const carouselDefaultProps = {
  dots: CarouselDot,
  autoSwipe: false,
  showDotsNumber: false,
  showNavStepper: false,
  isSliderAlawaysFullOfSlides: true,
  bodyScrollOnTouch: true,
  responsive: {
    1440: { nbItemsBySlide: 4 },
    1279: { nbItemsBySlide: 3 },
    767: { nbItemsBySlide: 2 },
  },
};
