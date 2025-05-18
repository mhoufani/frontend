import React, { HTMLProps, ReactNode } from 'react';
import cs from 'classnames';

import * as classes from './index.module.scss';

export interface ClassNamesProps {
  button?: string;
  primary?: string;
  secondary?: string;
  tertiary?: string;
  unStyled?: string;
}

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  element: HTMLButtonElement | HTMLLinkElement;
  variant?:
    | 'primary'
    | 'secondary'
    | 'unStyled'
    | 'tertiary'
    | 'button';
  classNames?: ClassNamesProps;
  children?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const Button = ({
  children,
  classNames = {},
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    {...props}
    type={type}
    className={cs(
      classes.button,
      classNames.button,
      classes[variant],
      classNames[variant],
    )}
  >
    {children}
  </button>
);

export default Button;
