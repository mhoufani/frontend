import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { classNameType } from 'proptypes';

import classes from './index.module.scss';

export const sizes = [
  10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36,
];

export const formats = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'h6-m',
  'h6-s',
];

export const sizes_alias = [
  'xxs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  'h6-s',
  'h6-m',
  'h6',
  'h5',
  'h4',
  'h3',
  'h2',
  'h1',
];

export const weights = [200, 300, 400, 600, 700, 900];

export const weights_alias = [
  'extraLight',
  'light',
  'normal',
  'semiBold',
  'bold',
  'extraBold',
  'black',
];

export const TextV2 = ({
  align,
  children,
  className,
  decoration,
  element: Element,
  format,
  size,
  style,
  weight,
  ...props
}) => {
  const classNames = [
    format ? classes[`format_${format}`] : null,
    size ? classes[`size_${size}`] : null,
    style ? classes[`style_${style}`] : null,
    weight ? classes[`weight_${weight}`] : null,
    decoration ? classes[`decoration_${decoration}`] : null,
    align ? classes[`align_${align}`] : null,
    className,
  ];

  return (
    <Element className={cs(...classNames)} {...props}>
      {children}
    </Element>
  );
};

TextV2.propTypes = {
  children: PropTypes.node.isRequired,
  className: classNameType,
  align: PropTypes.oneOf(['center', 'right']),
  decoration: PropTypes.oneOf([
    'lineThrough',
    'overline',
    'underline',
  ]),
  element: PropTypes.node,
  format: PropTypes.oneOf(formats),
  size: PropTypes.oneOf([...sizes, ...sizes_alias]),
  style: PropTypes.oneOf(['normal', 'italic']),
  weight: PropTypes.oneOf([...weights, ...weights_alias]),
};

TextV2.defaultProps = {
  element: 'span',
};
