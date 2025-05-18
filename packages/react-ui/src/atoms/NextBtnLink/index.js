import React from 'react';

import cs from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import classes from './index.module.scss';

export const NextBtnLink = ({
  children,
  link,
  classNames,
  ...props
}) => (
  <Link {...link} legacyBehavior>
    <a
      {...props}
      {...link}
      className={cs(classes.buttonLink, classNames.buttonLink, {
        [classes.disabled]: !link,
      })}
    >
      {children}
    </a>
  </Link>
);

NextBtnLink.propTypes = {
  children: PropTypes.node,
  link: PropTypes.shape({
    href: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
  }),
  classNames: PropTypes.shape({
    buttonLink: classNameType,
  }),
};

NextBtnLink.defaultProps = {
  link: { href: '' },
  classNames: {},
  children: null,
};
