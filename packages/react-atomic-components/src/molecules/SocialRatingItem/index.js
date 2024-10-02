import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';

import classes from './index.module.scss';
import { Picture } from 'ui-core/atoms';

export const SocialRatingItem = ({
  ratingCount,
  socialIcon,
  socialIconAlt,
  ratingNote,
  rateOut,
  classNames,
}) => {
  return (
    <div className={cs(classes.root, classNames.root)}>
      <div
        className={cs(classes.imgContainer, classNames.imgContainer)}
      >
        {socialIcon && (
          <Picture
            className={cs(classes.img, classNames.img)}
            alt={socialIconAlt}
            src={socialIcon}
          />
        )}
      </div>
      <div
        className={cs(
          classes.ratingContainer,
          classNames.ratingContainer
        )}
      >
        <div
          className={cs(
            classes.ratingNoteOuter,
            classNames.ratingNoteOuter
          )}
        >
          {ratingNote && (
            <span
              className={cs(
                classes.ratingNote,
                classNames.ratingNote
              )}
            >
              {`${ratingNote}${rateOut ? `/${rateOut}` : ''}`}
            </span>
          )}
        </div>
        <div>
          <span
            className={cs(
              classes.ratingCountText,
              classNames.ratingCountText
            )}
          >
            {ratingCount}
          </span>
        </div>
      </div>
    </div>
  );
};

SocialRatingItem.propTypes = {
  ratingNote: PropTypes.number,
  ratingCount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  rateOut: PropTypes.number,
  socialIcon: PropTypes.string,
  socialIconAlt: PropTypes.string,
  classNames: PropTypes.shape({
    root: classNameType,
    imgContainer: classNameType,
    img: classNameType,
    ratingContainer: classNameType,
    ratingNoteOuter: classNameType,
    ratingNote: classNameType,
    ratingCountText: classNameType,
  }),
};

SocialRatingItem.defaultProps = {
  ratingCount: 0,
  classNames: {},
};
