import React, { useRef } from 'react';

import cs from 'classnames';
import { Transition } from 'react-transition-group';

import PropTypes from 'prop-types';

import classes from './index.module.scss';

import { classNameType } from 'proptypes';
import {
  useBreakpoint,
  useIsScrolling,
  useScrollable,
  useScrollEdge,
} from 'hooks';
import ArrowLeftIcon from 'svgs/arrow-left.svg';
import ArrowRightIcon from 'svgs/arrow-right.svg';

// eslint-disable-next-line no-param-reassign
const easeCubicOut = t => --t * t * t + 1;

export const CarouselCard = React.forwardRef(
  (
    {
      children,
      fade,
      classNames,
      scrollByItem,
      isScrolling,
      scrollDuration,
    },
    ref
  ) => {
    const [isMobileVW, isTabletVW] = useBreakpoint();

    const isMobile = isMobileVW || isTabletVW;
    const trackNode = useRef(null);

    const getTrackPosOnViewPort = () => {
      const { x, width } = trackNode.current.getBoundingClientRect();
      return {
        trackStart: x,
        trackEnd: x + width,
      };
    };

    const getTrackOffset = () =>
      parseFloat(
        window
          .getComputedStyle(trackNode.current)
          .getPropertyValue('padding-left')
      );

    // compatibility for all navigators
    const scrollSmooth = (xTargetPos = 0) => {
      let timeStart = null;
      const xStart = trackNode.current.scrollLeft;
      const xDistance = xTargetPos - xStart;

      const step = timestamp => {
        if (!timeStart) timeStart = timestamp;
        const progress = (timestamp - timeStart) / scrollDuration;
        const distanceRel = easeCubicOut(progress) * xDistance;
        trackNode.current.scrollTo({ left: xStart + distanceRel });
        progress < 1 && requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const getItemsPos = () => {
      const { trackStart, trackEnd } = getTrackPosOnViewPort();
      return [...trackNode.current.childNodes].reduce(
        (items, node, index) => {
          const { x, width } = node.getBoundingClientRect();
          const isStartOnTrack = x >= trackStart && x <= trackEnd;
          const isFinishOnTrack =
            x + width >= trackStart && x + width <= trackEnd;
          const anchorRelStart = x - trackStart;
          return (
            items.push({
              index,
              isStartOnTrack,
              isFinishOnTrack,
              anchorRelStart,
              width,
              isFirst: index === 0,
              isLast:
                trackNode.current.childNodes.length - 1 === index,
            }) && items
          );
        },
        []
      );
    };

    const scrollRight = () => {
      const startOffset = getTrackOffset();
      const itemsPos = getItemsPos();
      const itemsOnView = itemsPos.filter(
        item => item.isStartOnTrack || item.isFinishOnTrack
      );
      const lastItemOnView = itemsOnView.pop();

      // not possible but secure if button is display
      if (lastItemOnView.isFinishOnTrack && lastItemOnView.isLast)
        return;

      const targetNodeRight = lastItemOnView.isFinishOnTrack
        ? itemsPos[lastItemOnView.index + 1]
        : lastItemOnView;

      const trackRemainingRight =
        trackNode.current.scrollWidth -
        (trackNode.current.scrollLeft +
          trackNode.current.clientWidth);

      const isScrollRel =
        !targetNodeRight.isLast &&
        trackRemainingRight >= targetNodeRight.anchorRelStart;

      scrollSmooth(
        isScrollRel
          ? trackNode.current.scrollLeft +
              targetNodeRight.anchorRelStart -
              startOffset
          : trackNode.current.scrollLeft + trackRemainingRight
      );
    };

    const scrollLeft = () => {
      const startOffset = getTrackOffset();
      const itemsPos = getItemsPos();
      const itemsOnView = itemsPos.filter(
        item => item.isStartOnTrack || item.isFinishOnTrack
      );
      const [firstItemOnView] = itemsOnView;
      // not possible but secure if button is display
      if (firstItemOnView.isStartOnTrack && firstItemOnView.isFirst)
        return;

      let { index } = firstItemOnView;
      let targetIndex = -1;
      let accWidthItemsOnView = 0;
      do {
        accWidthItemsOnView += itemsPos[index].width;
        if (accWidthItemsOnView > trackNode.current.clientWidth) {
          targetIndex = index + 1;
        }
        --index;
      } while (index >= 0 && targetIndex === -1);

      const scrollRel =
        itemsPos[targetIndex > -1 ? targetIndex : 0].anchorRelStart;

      scrollSmooth(
        trackNode.current.scrollLeft + scrollRel - startOffset
      );
    };

    const nav = next => {
      if (scrollByItem) {
        // eslint-disable-next-line no-unused-expressions
        next ? scrollRight() : scrollLeft();
      } else {
        const scrollXLeft = trackNode.current.scrollLeft;
        const scrollXWidth = trackNode.current.clientWidth;
        scrollSmooth(
          next
            ? scrollXLeft + scrollXWidth
            : scrollXLeft - scrollXWidth
        );
      }
    };

    const isScrollable = useScrollable(trackNode);
    const scrollEdge = useScrollEdge(trackNode);

    useIsScrolling(trackNode, isScrolling);

    return (
      <div
        ref={ref}
        className={cs(classes.carouselCard, classNames.container)}
      >
        {!isMobile && (
          <Transition
            appear
            in={isScrollable && scrollEdge !== 'min'}
            mountOnEnter
            timeout={250}
          >
            {step => (
              <button
                onClick={() => nav()}
                className={cs(
                  classes.sliderButton,
                  classNames.sliderButton,
                  classNames.sliderButtonPrev,
                  classes[step]
                )}
              >
                <ArrowLeftIcon
                  className={cs(classes.arrow, classNames.arrowPrev)}
                />
              </button>
            )}
          </Transition>
        )}
        {!isMobile && (
          <Transition
            appear
            in={isScrollable && scrollEdge !== 'max'}
            mountOnEnter
            timeout={250}
          >
            {state => (
              <button
                onClick={() => nav(true)}
                className={cs(
                  classes.sliderButton,
                  classNames.sliderButton,
                  classes.sliderButtonNext,
                  classNames.sliderButtonNext,
                  classes[state]
                )}
              >
                <ArrowRightIcon
                  className={cs(classes.arrow, classNames.arrowNext)}
                />
              </button>
            )}
          </Transition>
        )}
        <div className={cs(classes.trackOuter, classNames.slider)}>
          <div
            ref={trackNode}
            className={cs(
              classes.trackInner,
              isMobile && classes.trackInnerMobile,
              classNames.sliderInner
            )}
          >
            {children}
          </div>
        </div>
        {!isMobile && fade && (
          <Transition
            appear
            in={scrollEdge !== 'max'}
            mountOnEnter
            timeout={250}
          >
            {step => (
              <div
                className={cs(
                  classes.fadeOutRight,
                  classNames.fadeOutRight,
                  classes[step]
                )}
              />
            )}
          </Transition>
        )}
        {!isMobile && fade && (
          <Transition
            appear
            in={scrollEdge !== 'min'}
            mountOnEnter
            timeout={250}
          >
            {state => (
              <div
                className={cs(
                  classes.fadeOutLeft,
                  classNames.fadeOutLeft,
                  classes[state]
                )}
              />
            )}
          </Transition>
        )}
      </div>
    );
  }
);

CarouselCard.displayName = 'CarouselCard';

CarouselCard.propTypes = {
  children: PropTypes.node.isRequired,
  fade: PropTypes.bool,
  classNames: PropTypes.shape({
    container: classNameType,
    slider: classNameType,
    sliderInner: classNameType,
    sliderButton: classNameType,
    sliderButtonPrev: classNameType,
    sliderButtonNext: classNameType,
    fadeOutRight: classNameType,
    fadeOutLeft: classNameType,
    arrow: classNameType,
    arrowPrev: classNameType,
    arrowNext: classNameType,
  }),
  scrollByItem: PropTypes.bool,
  isScrolling: PropTypes.func,
  scrollDuration: PropTypes.number,
};

CarouselCard.defaultProps = {
  fade: false,
  scrollByItem: false,
  isScrolling: () => null,
  scrollDuration: 2000,
  classNames: {},
};
