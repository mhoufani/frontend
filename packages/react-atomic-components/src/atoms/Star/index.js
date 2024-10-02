// import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import StarIcon from 'svgs/star.svg';

import classes from './index.module.scss';

export const Star = ({ classNames, partial }) => {
  const width = `${partial * 100}%`;

  return (
    <div className={cs(classes.star, classNames.star)}>
      <div
        className={cs(classes.mask, !partial && classes.maskFull)}
        style={{ width }}
      >
        <StarIcon
          className={cs(classes.starIcon, classNames.starIcon)}
        />
      </div>
      <StarIcon className={cs(classes.starIconBack)} />
    </div>
  );
};

Star.defaultProps = {
  classNames: {},
  partial: 0,
};

Star.propTypes = {
  classNames: PropTypes.object,
  partial: PropTypes.number,
};
