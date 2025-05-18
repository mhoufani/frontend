import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import classes from './index.module.scss';
import { infoBoxTypes } from 'ui-core/constants';
import {
  Picture,
  NextBtnLink,
  RichText,
  TitleV2,
} from 'ui-core/atoms';

export const ContactT1V1 = ({
  buttonText,
  title,
  text,
  phone,
  classNames,
  imageData,
}) => {
  const { src, alt, placeholderSrc } = imageData || {};
  return (
    <div
      className={cs(
        classes.containerContact,
        classNames.containerContact
      )}
    >
      <Picture
        alt={alt}
        src={src}
        classNames={{
          image: classes.image,
          imgOnError: classes.imgOnError,
        }}
        placeholderSrc={placeholderSrc}
      />
      <div
        className={cs(
          classes.contentContainer,
          classNames.contentContainer
        )}
      >
        <TitleV2
          level={4}
          className={cs(classes.title, classNames.title)}
        >
          {title}
        </TitleV2>
        <RichText>{text}</RichText>
        {phone && (
          <NextBtnLink
            link={{ href: `tel:${phone}` }}
            classNames={{
              buttonLink: cs(classes.buttonLink),
            }}
            target="_blank"
          >
            {buttonText}
          </NextBtnLink>
        )}
      </div>
    </div>
  );
};

ContactT1V1.propTypes = {
  buttonText: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  phone: PropTypes.string,
  classNames: PropTypes.shape({
    blockContactContainer: classNameType,
    contentContainer: classNameType,
    title: classNameType,
  }),
  imageData: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    placeholderSrc: PropTypes.string,
  }),
};

ContactT1V1.defaultProps = {
  classNames: {},
};
