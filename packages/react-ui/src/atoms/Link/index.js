import React from 'react';

import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import cs from 'classnames';

import classes from './index.module.scss';

/**
 * Atom Link
 *
 * ### Usage
 *
 * ```jsx
 * <Link url={"https://google.com"} text='text de mon lien'/>
 *
 * ```
 * On définit l'url de notre lien via le parametre `url`
 *
 *
 */

export const Link = ({
  children,
  href,
  target,
  rel,
  text,
  disabled,
  classNames,
  ...props
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cs(classes.link, classNames.link, {
        [classes.disabled]: disabled,
        [classNames.disabled]: disabled,
      })}
      {...props}
    >
      {children || text}
    </a>
  );
};
Link.propTypes = {
  classNames: PropTypes.shape({
    link: classNameType,
    disabled: classNameType,
  }),
  href: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
};

Link.defaultProps = {
  classNames: {},
  href: '#',
  text: 'text de mon lien',
  children: null,
};
