import React from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';

import classes from './index.module.scss';

export const LoadingSpinner = ({ classNames }) => {
  return (
    <svg
      className={cs(classes.content, classNames.content)}
      viewBox="25 25 50 50"
    >
      <circle
        className={cs(classes.loader, classNames.loader)}
        cx="50"
        cy="50"
        r="20"
      />
    </svg>
  );
};

LoadingSpinner.propTypes = {
  classNames: PropTypes.shape({
    content: classNameType,
    loader: classNameType,
  }),
};

LoadingSpinner.defaultProps = {
  classNames: {},
};
