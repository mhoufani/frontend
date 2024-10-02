'use client';
import React from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import classes from './index.module.scss';

export const ContainerV2 = ({
  children,
  classNames,
  element: Element,
}) => (
  <Element className={cs(classes.container, classNames.container)}>
    {children}
  </Element>
);

ContainerV2.propTypes = {
  children: PropTypes.node,
  classNames: PropTypes.shape({
    container: classNameType,
  }),
  element: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

ContainerV2.defaultProps = {
  children: null,
  classNames: {},
  element: 'div',
};
