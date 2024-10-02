import React from 'react';

import PropTypes from 'prop-types';

import cs from 'classnames';

import classes from './index.module.scss';
import { classNameType } from 'proptypes';

export const Card = ({ children, classNames, variant, ...props }) => (
  <div
    className={cs(
      classes.card,
      classNames.card,
      classes[variant],
      classNames[variant]
    )}
    {...props}
  >
    {children}
  </div>
);

Card.propTypes = {
  classNames: PropTypes.shape({
    card: classNameType,
  }),
  variant: PropTypes.string,
  children: PropTypes.node,
};

Card.defaultProps = {
  classNames: {},
  children: null,
};
