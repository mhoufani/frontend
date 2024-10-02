import React from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';

import classes from './index.module.scss';

/**
 * Atom Loader
 *
 * ### Usage
 *
 * ```jsx
 * <Loader />
 *
 * ```
 */

export const Loader = ({ classNames }) => (
  <div className={cs(classes.loader, classNames.loader)}>
    <div className={cs(classes.dot, classNames.dot)} />
    <div className={cs(classes.dot, classNames.dot)} />
    <div className={cs(classes.dot, classNames.dot)} />
  </div>
);

Loader.propTypes = {
  classNames: PropTypes.shape({
    loader: classNameType,
    dot: classNameType,
  }),
};

Loader.defaultProps = {
  classNames: {},
};
