import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import { Star } from 'ui-core/atoms';

import classes from './index.module.scss';

export const StarsRating = ({ classNames, rate, total }) => {
  const partialKey = Math.floor(rate / 1);
  const partial = rate / 1 - partialKey;
  const keys = useMemo(
    () => Array.from({ length: total }).map((_, k) => k),
    [total]
  );

  return (
    <div className={cs(classes.stars, classNames.stars)}>
      {keys.map(key => {
        return (
          <Star
            key={key}
            classNames={{
              star: cs(classes.star, classNames.star),
              starIcon: classNames.starIcon,
            }}
            partial={
              partialKey > key ? 1 : partialKey === key ? partial : 0
            }
          />
        );
      })}
    </div>
  );
};

StarsRating.defaultProps = {
  classNames: {},
  rate: 0,
  total: 5,
};

StarsRating.propTypes = {
  classNames: PropTypes.shape({
    stars: classNameType,
    star: classNameType,
    starIcon: classNameType,
  }),
  rate: PropTypes.number.isRequired,
  total: PropTypes.number,
};
