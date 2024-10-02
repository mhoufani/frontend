import React, { Children } from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import classes from './index.module.scss';

export const Gallery = ({ children, classNames }) => (
  <div className={cs(classes.gallery, classNames.gallery)}>
    <div className={cs(classes.container, classNames.container)}>
      {children &&
        Children.toArray(children).map((child, key) => (
          <div
            key={key}
            className={cs(classes.item, classNames.item)}
          >
            {child}
          </div>
        ))}
    </div>
  </div>
);

Gallery.propTypes = {
  children: PropTypes.node,
  classNames: PropTypes.shape({
    gallery: classNameType,
    container: classNameType,
    item: classNameType,
  }),
};

Gallery.defaultProps = {
  classNames: {},
  children: null,
};
