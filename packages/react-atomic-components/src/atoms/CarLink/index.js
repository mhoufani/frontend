import React from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';

import classes from './index.module.scss';

export const CarLink = ({
  classNames,
  link,
  label,
  itemProp,
  title,
  ...otherProps
}) => {
  return (
    <a
      href={link}
      itemProp={itemProp}
      title={title}
      className={cs(classes.carLink, classNames.carLink)}
      {...otherProps}
    >
      {label}
    </a>
  );
};

CarLink.propTypes = {
  classNames: PropTypes.shape({
    carLink: classNameType,
  }),
  link: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  itemProp: PropTypes.string,
};

CarLink.defaultProps = {
  classNames: {},
};
