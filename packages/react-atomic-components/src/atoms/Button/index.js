import React from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import classes from './index.module.scss';

export const Button = ({
  children,
  classNames,
  element: Element,
  variant,
  onClick,
  type,
  disabled,
  ...props
}) => (
  <Element
    {...props}
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={cs(
      classes.button,
      classNames.button,
      classes[variant],
      classNames[variant]
    )}
  >
    {children}
  </Element>
);

Button.propTypes = {
  classNames: PropTypes.shape({
    button: PropTypes.string,
    primary: PropTypes.string,
    secondary: PropTypes.string,
    tertiary: PropTypes.string,
    unstyled: PropTypes.string,
  }),
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  classNames: {},
  children: null,
  disabled: false,
  element: 'button',
  type: 'button',
  onClick: () => null,
};
