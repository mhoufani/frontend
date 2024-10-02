'use client';
import React from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import classes from './index.module.scss';

export const Container = ({ children, classNames = {} }) => (
  <section className={cs(classes.container, classNames.container)}>
    {children}
  </section>
);

Container.propTypes = {
  children: PropTypes.node,
  classNames: PropTypes.shape({
    container: classNameType,
  }),
};

Container.defaultProps = {
  children: null,

  classNames: {
    container: '',
  },
};
