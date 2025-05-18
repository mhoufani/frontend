import React, { useState } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

import { Picture } from 'ui-core/atoms';
import { Thumbnails } from 'ui-core/molecules';

import ArrowLeftIcon from 'svgs/arrow-left.svg';
import ArrowRightIcon from 'svgs/arrow-right.svg';
import Cross from 'svgs/cross-icon.svg';

import classes from './index.module.scss';

export const GalleryFull = ({ pictures, current, onClose }) => {
  const [currentPictures, setCurrentPictures] = useState(current);
  const [onToggle, setOnToggle] = useState(true);

  const handleThumbnailClick = _current => {
    setCurrentPictures(_current);
  };

  const handleToggle = () => {
    setOnToggle(!onToggle);
  };

  const handlePrev = () => {
    let newCurrent;
    switch (true) {
      case currentPictures === 0:
        newCurrent = pictures.length - 1;
        break;
      default:
        newCurrent = currentPictures - 1;
        break;
    }

    setCurrentPictures(newCurrent);
  };

  const handleNext = () => {
    let newCurrent;
    switch (true) {
      case currentPictures === pictures.length - 1:
        newCurrent = 0;
        break;
      default:
        newCurrent = currentPictures + 1;
        break;
    }

    setCurrentPictures(newCurrent);
  };

  return (
    <>
      <div className={classes.overlay} />
      <div className={classes.gallery}>
        <div className={classes.inner}>
          <div className={classes.pictureContainer}>
            <Picture
              classNames={{
                image: classes.image,
                img: classes.img,
              }}
              alt="full gallery"
              src={pictures[currentPictures].src}
              sources={[
                {
                  srcSet: pictures[currentPictures].srcSet,
                  sizes: pictures[currentPictures].sizes,
                },
              ]}
            />
          </div>
          <button onClick={onClose} className={classes.crossNav}>
            <Cross className={classes.icon} />
          </button>
          <button
            onClick={handlePrev}
            className={cs(classes.nav, classes.navPrev)}
          >
            <ArrowLeftIcon className={classes.LeftIcon} />
          </button>
          <button
            onClick={handleNext}
            className={cs(classes.nav, classes.navNext)}
          >
            <ArrowRightIcon className={classes.LeftIcon} />
          </button>
        </div>
        <Thumbnails
          handleToggle={handleToggle}
          onToggle={onToggle}
          current={currentPictures}
          onSelect={handleThumbnailClick}
          pictures={pictures}
        />
      </div>
    </>
  );
};

GalleryFull.propTypes = {
  pictures: PropTypes.array,
  current: PropTypes.number,
  onClose: PropTypes.func,
};

GalleryFull.defaultProps = {
  pictures: [],
  current: 0,
};
