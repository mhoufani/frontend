import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

import { Picture } from 'ui-core/atoms';

import ArrowBottomIcon from 'svgs/arrow-bottom-icon.svg';
import ArrowTopIcon from 'svgs/arrow-top.svg';

import classes from './index.module.scss';

export const Thumbnails = ({
  pictures,
  current,
  onSelect,
  handleToggle,
  onToggle,
}) => {
  const [leftAnimate, setLeftAnimate] = useState(0);
  const thumbnails = useRef();
  const thumbnailList = useRef();

  const calculateLeft = useCallback(
    currentSlide => {
      const diff =
        thumbnailList.current.offsetWidth -
        thumbnails.current.offsetWidth;
      const left = -(currentSlide * (diff / (pictures.length + 1)));
      if (diff > 0) setLeftAnimate(left);
    },
    [pictures.length]
  );

  useEffect(() => {
    calculateLeft(current);
  }, [leftAnimate, current, calculateLeft]);

  return (
    <div
      ref={thumbnails}
      className={cs(classes.thumbnailsContent, {
        [classes.thumbnailsListHidden]: !onToggle,
      })}
    >
      <div className={classes.header}>
        <div className={classes.count}>
          {current + 1} / {pictures.length} Photos non contractuelles
        </div>

        <button onClick={handleToggle}>
          {!onToggle ? (
            <>
              <ArrowTopIcon className={classes.arrowBottom} />{' '}
              Afficher les photos
            </>
          ) : (
            <>
              <ArrowBottomIcon className={classes.arrowBottom} />{' '}
              Cacher les photos
            </>
          )}
        </button>
      </div>
      <div
        className={classes.thumbnailsList}
        ref={thumbnailList}
        style={{ transform: `translateX(${leftAnimate}px)` }}
      >
        {pictures.map(({ src, srcSet, sizes }, index) => (
          <div
            aria-hidden="true"
            onClick={() => onSelect(index)}
            className={classes.thumbnails}
            key={index}
          >
            <Picture
              classNames={{ loader: classes.loader }}
              alt="ad card"
              src={src}
              sources={[{ srcSet, sizes }]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

Thumbnails.propTypes = {
  pictures: PropTypes.array,
  current: PropTypes.number,
  onSelect: PropTypes.func,
  handleToggle: PropTypes.func,
  onToggle: PropTypes.bool,
};

Thumbnails.defaultProps = {
  pictures: [],
  current: 0,
  onSelect: () => null,
  handleToggle: () => null,
  onToggle: false,
};
