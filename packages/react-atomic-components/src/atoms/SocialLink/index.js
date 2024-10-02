import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';

import { Image } from '../Image';

import classes from './index.module.scss';

/**
 * Atom Social Link
 *
 * ### Usage
 *
 * ```jsx
 * <SocialLink/>
 *
 * ```
 * On peut surcharger la classe de l'atom mais la contribution se situera au niveau de l'enfant (généralement <Picture/> pour définir l'image du lien)git
 *
 */
export const SocialLink = ({
  classNames,
  children,
  data,
  isButton,
}) => {
  const { url, name, logoSrc, fallbackBg } = data;
  const goToLink = () => window.open(url, '_blank');
  const content = children || (
    <Image
      src={logoSrc}
      alt={name}
      className={cs(classes.icon, classNames.icon)}
    />
  );
  const needsFallbackBg = !logoSrc && fallbackBg;

  return isButton ? (
    <button
      className={cs(
        classes.socialLink,
        classes[name.toLowerCase()],
        classNames.socialLink
      )}
      onClick={goToLink}
      {...(needsFallbackBg && {
        style: { backgroundColor: fallbackBg },
      })}
    >
      {content}
    </button>
  ) : (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={cs(
        classes.socialLink,
        classes[name.toLowerCase()],
        classNames.socialLink
      )}
      {...(needsFallbackBg && {
        style: { backgroundColor: fallbackBg },
      })}
    >
      {content}
    </a>
  );
};

SocialLink.propTypes = {
  isButton: PropTypes.bool,
  classNames: PropTypes.shape({
    socialLink: classNameType,
    icon: classNameType,
  }),
  data: PropTypes.shape({
    url: PropTypes.string.isRequired,
    logoSrc: PropTypes.string.isRequired,
    name: PropTypes.oneOf([
      'Facebook',
      'Twitter',
      'Instagram',
      'Linkedin',
      'Youtube',
      'Pinterest',
    ]).isRequired,
    fallbackBg: PropTypes.string,
  }).isRequired,
  children: PropTypes.any,
};

SocialLink.defaultProps = {
  classNames: {},
  data: { url: '', name: '', logoSrc: '', fallbackBg: '' },
  children: null,
};
