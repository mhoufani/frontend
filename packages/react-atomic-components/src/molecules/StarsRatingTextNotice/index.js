import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { RatingTextNotice } from 'ui-core/atoms';
import { classNameType } from 'proptypes';
import { StarsRating } from 'ui-core/molecules';

import classes from './index.module.scss';

export const StarsRatingTextNotice = ({
  classNames,
  nbNotice,
  noticeMessage,
  rate,
  total,
}) => {
  return (
    <div className={cs(classes.outer, classNames.outer)}>
      <StarsRating
        classNames={{
          stars: cs(classes.stars, classNames.stars),
          star: cs(classes.star, classNames.star),
          starIcon: cs(classes.starIcon, classNames.starIcon),
        }}
        rate={rate}
        total={total}
      />
      <RatingTextNotice
        className={cs(
          classes.ratingTextNotice,
          classNames.ratingTextNotice
        )}
        nbNotice={nbNotice}
        noticeMessage={noticeMessage}
        rate={rate}
        total={total}
        weight="bold"
      />
    </div>
  );
};

StarsRatingTextNotice.defaultProps = {
  classNames: {},
  rate: 0,
  total: 5,
};

StarsRatingTextNotice.propTypes = {
  classNames: PropTypes.shape({
    outer: classNameType,
    ratingTextNotice: classNameType,
    stars: classNameType,
    star: classNameType,
    starIcon: classNameType,
  }),
  nbNotice: PropTypes.number,
  noticeMessage: PropTypes.string,
  rate: PropTypes.number,
  total: PropTypes.number,
};
