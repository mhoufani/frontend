import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { Picture } from 'ui-core/atoms';

import classes from './index.module.scss';

export const SocialShare = ({ src, link }) => {
  return (
    <Link href={link} legacyBehavior>
      <a>
        <Picture
          classNames={{
            image: classes.image,
            imgOnError: classes.imgOnError,
          }}
          src={src}
        />
      </a>
    </Link>
  );
};

SocialShare.propTypes = {
  src: PropTypes.string,
  link: PropTypes.string,
};

SocialShare.defaultProps = {
  src: '',
  link: '',
};
