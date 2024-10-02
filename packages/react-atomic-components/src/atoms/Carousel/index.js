import React, {
  forwardRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
  Children,
  useImperativeHandle,
} from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import classes from './index.module.scss';

import { classNameType } from 'proptypes';
import { useInterval, useTimer } from 'hooks';
import { scroll } from 'util-common/dom';

const useItemContainerStyles = itemsBySlide =>
  useMemo(
    () => ({
      width: `${100 / itemsBySlide}%`,
    }),
    [itemsBySlide]
  );

export const Carousel = forwardRef(
  (
    {
      children,
      activeIndex: _activeIndex,
      nbItemBySlide,
      showNavStepper,
      showNavStepperOnLimit,
      showNavDots,
      showNumberPictures,
      autoSwipe,
      autoSwipePauseHover,
      autoSwipeTimeInterval,
      autoSwipeTimePaused,
      touchMoveSwipeXmin,
      showDotsNumber,
      dots,
      navStepperPrev,
      navStepperNext,
      navStepperPrevContent,
      navStepperNextContent,
      responsive,
      onSlideActive,
      trackComponent: Track,
      slideComponent: Slide,
      bodyScrollOnTouch,
      isSliderAlawaysFullOfSlides,
      classNames,
    },
    ref
  ) => {
    const trackNode = useRef(null);
    const touchMoveStartX = useRef(0);
    const touchTranslateStart = useRef(0);
    const touchMoveXRel = useRef(0);
    const [nbItems, setNbItems] = useState(Children.count(children));
    const [activeIndex, setActiveIndex] = useState(_activeIndex);
    const [slideWidth, setSlideWidth] = useState(null);
    const [translateX, setTranslateX] = useState(0);
    const [paused, setPaused] = useState(false);
    const [autoSwipeDelayed, setAutoSwipeDelayed] = useState(false);
    const [itemsBySlide, setItemsBySlide] = useState(nbItemBySlide);

    const handleResponsive = useCallback(() => {
      const trackNodeWidth =
        trackNode.current.getBoundingClientRect().width;

      // update track for keep sync translate breakpoint
      if (slideWidth !== trackNodeWidth) {
        setSlideWidth(trackNodeWidth);
        setTranslateX(-activeIndex * trackNodeWidth);
      }

      // find the first breakpoint less than current width window otherwise apply default
      if (responsive) {
        const params = Object.keys(responsive)
          .sort((a, b) => b - a)
          .find(width => width < window.innerWidth);

        if (params && responsive[params]) {
          const { nbItemsBySlide } = responsive[params];
          if (nbItemsBySlide !== itemsBySlide)
            setItemsBySlide(nbItemsBySlide);
        } else if (nbItemBySlide !== itemsBySlide) {
          setItemsBySlide(nbItemBySlide);
        }
      }
    }, [
      activeIndex,
      nbItemBySlide,
      slideWidth,
      responsive,
      itemsBySlide,
    ]);

    useEffect(() => {
      onSlideActive(activeIndex);
    }, [onSlideActive, activeIndex]);

    useEffect(() => {
      if (trackNode.current) {
        handleResponsive();
      }
    }, [handleResponsive]);

    useEffect(() => {
      if (window) {
        window.addEventListener('resize', handleResponsive);
      }
      return () => {
        window.removeEventListener('resize', handleResponsive);
      };
    }, [handleResponsive]);

    const getNbSlides = useCallback(
      () => Math.ceil(nbItems / itemsBySlide),
      [nbItems, itemsBySlide]
    );

    const handleChangeSlide = useCallback(
      index => {
        let nextIdx = index;
        const nbSlides = getNbSlides();
        if (index < 0) nextIdx = nbSlides - 1;
        if (index >= nbSlides) nextIdx = 0;
        let nextTranslateX = -nextIdx * slideWidth;

        const nbItemsLeft = nbItems - nextIdx * itemsBySlide;
        // display the last slide full of items
        if (nextIdx + 1 === nbSlides && isSliderAlawaysFullOfSlides) {
          const itemWidth = slideWidth / itemsBySlide;
          const numberOfItemToDisplay = itemsBySlide - nbItemsLeft;
          nextTranslateX += itemWidth * numberOfItemToDisplay;
        }
        setActiveIndex(nextIdx);
        setTranslateX(nextTranslateX);
      },
      [
        getNbSlides,
        isSliderAlawaysFullOfSlides,
        itemsBySlide,
        nbItems,
        slideWidth,
      ]
    );

    useEffect(() => {
      setNbItems(Children.count(children));
    }, [handleChangeSlide, children]);

    const slide = {
      next: () => handleChangeSlide(activeIndex + 1),
      prev: () => handleChangeSlide(activeIndex - 1),
      moveTo: index => handleChangeSlide(index),
    };

    const handleTouchStart = e => {
      !bodyScrollOnTouch && scroll.hideBodyOverflow();
      autoSwipe && setPaused(true);
      touchTranslateStart.current = translateX;
      touchMoveStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = e => {
      touchMoveXRel.current =
        e.touches[0].clientX - touchMoveStartX.current;
      setTranslateX(
        touchTranslateStart.current + touchMoveXRel.current
      );
    };

    const handleNavStepperPrev = () => {
      slide.prev();
      autoSwipe && setAutoSwipeDelayed(true);
    };

    const handleNavStepperNext = () => {
      slide.next();
      autoSwipe && setAutoSwipeDelayed(true);
    };

    const handleChangeSlideDot = slideIdx => {
      if (slideIdx !== activeIndex) {
        slide.moveTo(slideIdx);
        // prevent change slide
        autoSwipe && setAutoSwipeDelayed(true);
      }
    };

    const handleTouchEnd = () => {
      !bodyScrollOnTouch && scroll.showBodyOverflow();
      const resetTranslation = () =>
        setTranslateX(touchTranslateStart.current);
      const isLeftMove = touchMoveXRel.current > 0;
      const isRightMove = touchMoveXRel.current < 0;
      const isQuiteMoveLength =
        Math.abs(touchMoveXRel.current) > touchMoveSwipeXmin;

      if (isQuiteMoveLength) {
        if (isLeftMove) {
          activeIndex !== 0 ? slide.prev() : resetTranslation();
        }
        if (isRightMove) {
          activeIndex !== Math.ceil(nbItems / itemsBySlide) - 1
            ? slide.next()
            : resetTranslation();
        }
      } else {
        resetTranslation();
      }

      touchTranslateStart.current = 0;
      touchMoveStartX.current = 0;
      touchMoveXRel.current = 0;
      autoSwipe && setPaused(false);
      autoSwipe && setAutoSwipeDelayed(true);
    };

    const itemContainerStyles = useItemContainerStyles(itemsBySlide);

    useTimer(
      () => {
        setAutoSwipeDelayed(false);
      },
      autoSwipeDelayed,
      autoSwipeTimePaused
    );

    useInterval(
      () => {
        if (autoSwipe && !paused) {
          slide.next();
        }
      },
      autoSwipeDelayed ? null : autoSwipeTimeInterval
    );

    useImperativeHandle(ref, () => ({
      prev: handleNavStepperPrev,
      next: handleNavStepperNext,
      moveTo: handleChangeSlideDot,
    }));

    return (
      <div className={cs(classes.carousel, classNames.carousel)}>
        <div
          className={cs(classes.trackOuter, classNames.trackOuter)}
          onMouseEnter={() => autoSwipePauseHover && setPaused(true)}
          onMouseLeave={() => autoSwipePauseHover && setPaused(false)}
        >
          <Track
            ref={trackNode}
            className={cs(classes.trackInner, classNames.trackInner)}
            style={{
              transform: `translateX(${translateX}px)`,
              transition: !touchMoveXRel.current && 'transform 0.3s',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {Children.map(children, (child, index) => (
              <Slide
                key={`slide_${index}`}
                style={itemContainerStyles}
                className={cs(
                  classes.itemContainer,
                  classNames.itemContainer
                )}
              >
                {child}
              </Slide>
            ))}
          </Track>
        </div>
        {showNumberPictures && (
          <div className={cs(classNames.numberPictures)}>
            {activeIndex + 1} /{nbItems}
          </div>
        )}
        {showNavDots && getNbSlides() > 1 && (
          <div className={cs(classes.dots, classNames.dots)}>
            {[...Array(getNbSlides()).keys()].map(slideIdx =>
              typeof dots === 'function' ? (
                <React.Fragment key={`dot_${slideIdx}`}>
                  {dots(slideIdx, slideIdx === activeIndex, () =>
                    handleChangeSlideDot(slideIdx)
                  )}
                </React.Fragment>
              ) : (
                <button
                  key={`dot_${slideIdx}`}
                  type="button"
                  className={cs(classes.dot, classNames.dot, {
                    [classes.dot_active]: slideIdx === activeIndex,
                    [classNames.dot_active]: slideIdx === activeIndex,
                  })}
                  onClick={() => {
                    if (slideIdx !== activeIndex) {
                      slide.moveTo(slideIdx);
                      // prevent change slide
                      autoSwipe && setAutoSwipeDelayed(true);
                    }
                  }}
                >
                  {showDotsNumber && slideIdx + 1}
                </button>
              )
            )}
          </div>
        )}
        {showNavStepper && (
          <>
            {typeof navStepperPrev === 'function'
              ? navStepperPrev(handleNavStepperPrev)
              : !(activeIndex === 0 && !showNavStepperOnLimit) && (
                  <button
                    type="button"
                    onClick={e => {
                      e.preventDefault();
                      handleNavStepperPrev();
                    }}
                    className={cs(
                      classes.navStepper,
                      classNames.navStepper,
                      classes.navStepperPrev,
                      classNames.navStepperPrev
                    )}
                  >
                    {navStepperPrevContent}
                  </button>
                )}
            {typeof navStepperNext === 'function'
              ? navStepperNext(handleNavStepperNext)
              : !(
                  activeIndex === nbItems - 1 &&
                  !showNavStepperOnLimit
                ) && (
                  <button
                    type="button"
                    onClick={e => {
                      e.preventDefault();
                      handleNavStepperNext();
                    }}
                    className={cs(
                      classes.navStepper,
                      classNames.navStepper,
                      classes.navStepperNext,
                      classNames.navStepperNext
                    )}
                  >
                    {navStepperNextContent}
                  </button>
                )}
          </>
        )}
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';

Carousel.propTypes = {
  classNames: PropTypes.shape({
    carousel: classNameType,
    trackOuter: classNameType,
    trackInner: classNameType,
    itemContainer: classNameType,
    navStepper: classNameType,
    navStepperPrev: classNameType,
    navStepperNext: classNameType,
    numberPictures: classNameType,
    dots: classNameType,
    dot: classNameType,
    dot_active: classNameType,
  }),
  children: PropTypes.node,
  activeIndex: PropTypes.number,
  nbItemBySlide: PropTypes.number,
  showNavDots: PropTypes.bool,
  autoSwipe: PropTypes.bool,
  autoSwipePauseHover: PropTypes.bool,
  autoSwipeTimeInterval: PropTypes.number,
  autoSwipeTimePaused: PropTypes.number,
  touchMoveSwipeXmin: PropTypes.number,
  showDotsNumber: PropTypes.bool,
  showNavStepperOnLimit: PropTypes.bool,
  dots: PropTypes.func,
  showNavStepper: PropTypes.bool,
  navStepperPrev: PropTypes.func,
  navStepperNext: PropTypes.func,
  navStepperPrevContent: PropTypes.any,
  navStepperNextContent: PropTypes.any,
  responsive: PropTypes.shape({
    width: PropTypes.shape({
      nbItemsBySlide: PropTypes.number,
    }),
  }),
  isSliderAlawaysFullOfSlides: PropTypes.bool,
  onSlideActive: PropTypes.func,
  trackComponent: PropTypes.string,
  slideComponent: PropTypes.string,
  bodyScrollOnTouch: PropTypes.bool,
  showNumberPictures: PropTypes.bool,
};

Carousel.defaultProps = {
  classNames: {},
  activeIndex: 0,
  nbItemBySlide: 1,
  showNavStepper: true,
  showNavDots: true,
  autoSwipe: true,
  autoSwipePauseHover: true,
  autoSwipeTimeInterval: 3000,
  autoSwipeTimePaused: 3000,
  touchMoveSwipeXmin: 70,
  showNumberPictures: false,
  showDotsNumber: true,
  showNavStepperOnLimit: true,
  isSliderAlawaysFullOfSlides: false,
  navStepperPrevContent: 'Prev',
  navStepperNextContent: 'Next',
  // todo: add keys for remove or add property
  responsive: {},
  onSlideActive: () => null,
  trackComponent: 'ul',
  slideComponent: 'li',
  bodyScrollOnTouch: false,
  dots: undefined,
  navStepperPrev: undefined,
  navStepperNext: undefined,
  children: null,
};
