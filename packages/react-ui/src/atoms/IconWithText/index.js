import React from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import classes from './index.module.scss';

export const IconWithText = ({
  Icon,
  classNames,
  label,
  isGreen,
}) => (
  <div
    className={cs(
      classes.iconWithTextContainer,
      classNames.iconWithTextContainer
    )}
  >
    {Icon && (
      <Icon
        className={cs(classes.icon, classNames.icon, {
          [classes.iconGreen]: isGreen,
        })}
      />
    )}
    <span
      className={cs(classes.text, classNames.text, {
        [classes.textGreen]: isGreen,
      })}
    >
      {label}
    </span>
  </div>
);

IconWithText.propTypes = {
  classNames: PropTypes.shape({
    iconWithTextContainer: classNameType,
    icon: classNameType,
    text: classNameType,
  }),
  Icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  label: PropTypes.node,
  isGreen: PropTypes.bool,
};

IconWithText.defaultProps = {
  classNames: {},
  children: null,
  type: 'button',
  label: '',
  isGreen: false,
  onClick: () => null,
};
