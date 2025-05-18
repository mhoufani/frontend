import React from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';

import classes from './index.module.scss';

export const CarTypeBtn = ({
  classNames,
  typeLabel,
  isActive,
  icon,
  nbAvailable,
  ...props
}) => (
  <button
    {...props}
    className={cs(classes.carTypeBtn, classNames.carTypeBtn, {
      [classes.active]: isActive,
    })}
  >
    {icon}
    <em className={cs(classes.carLabel, classNames.carLabel)}>
      {typeLabel}
    </em>
    <span className={cs(classes.available, classNames.available)}>
      {nbAvailable}
    </span>
  </button>
);

CarTypeBtn.propTypes = {
  icon: PropTypes.element,
  typeLabel: PropTypes.string,
  nbAvailable: PropTypes.string,
  format: PropTypes.string,
  type: PropTypes.string,
  isActive: PropTypes.bool,
  classNames: PropTypes.shape({
    carTypeBtn: classNameType,
    active: classNameType,
    carLabel: classNameType,
    available: classNameType,
  }),
};

CarTypeBtn.defaultProps = {
  isActive: false,
  typeLabel: 'Citadine',
  nbAvailable: '(300)',
  format: 'button',
  type: 'button',
  classNames: {},
};
