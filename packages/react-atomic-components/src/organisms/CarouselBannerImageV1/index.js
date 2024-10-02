import PropTypes from 'prop-types';
import { Carousel, CarouselDot } from 'ui-core/atoms';
import { BannerImage } from 'ui-core/molecules';
import ArrowLeftSVG from 'svgs/arrow-left.svg';
import ArrowRightSVG from 'svgs/arrow-right.svg';
import { isEmpty } from 'util-common/checker';

import classes from './index.module.scss';

export const CarouselBannerImageV1 = ({
  banners,
  carouselProps,
  defaultWidth,
  withEagerLoading,
}) => {
  return (
    !isEmpty(banners) && (
      <Carousel
        {...carouselDefaultProps}
        {...carouselProps}
        classNames={{
          carousel: classes.carousel_carousel,
          dots: classes.carousel_dots,
          navStepper: classes.carousel_navStepper,
          navStepperNext: classes.carousel_navStepperNext,
          navStepperPrev: classes.carousel_navStepperPrev,
        }}
      >
        {banners.map(({ element, elementProps, images }, key) => {
          const loading =
            key === 0 && withEagerLoading ? 'eager' : 'lazy';

          return (
            <BannerImage
              key={key}
              classNames={{ banner: classes.banner }}
              defaultWidth={defaultWidth}
              element={element}
              elementProps={elementProps}
              imageProps={{ loading }}
              images={images}
            />
          );
        })}
      </Carousel>
    )
  );
};

CarouselBannerImageV1.defaultProps = {
  banners: [],
  carouselProps: {},
  withEagerLoading: true,
};

CarouselBannerImageV1.propTypes = {
  banners: PropTypes.arrayOf(
    PropTypes.shape({
      element: PropTypes.element,
      elementProps: PropTypes.object,
      images: PropTypes.object,
    })
  ),
  carouselProps: PropTypes.object,
  defaultWidth: PropTypes.number,
  withEagerLoading: PropTypes.bool,
};

const carouselDefaultProps = {
  autoSwipe: false,
  bodyScrollOnTouch: true,
  dots: CarouselDot,
  isSliderAlawaysFullOfSlides: true,
  navStepperPrevContent: <ArrowLeftSVG />,
  navStepperNextContent: <ArrowRightSVG />,
  showDotsNumber: false,
  showNavStepperOnLimit: false,
};
