import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import classes from './index.module.scss';
import { infoBoxTypes } from 'ui-core/constants';
import {
  Picture,
  NextBtnLink,
  SectionContainerRounded,
  Text,
  TitleV2,
} from 'ui-core/atoms';

export const BlockContactV2 = ({
  title,
  text1,
  text2,
  phone,
  prettyPhone,
  secondaryBtnText,
  primaryBtnText,
  ctaLink,
  classNames,
  isNested,
  imageData,
}) => {
  const { src, alt, placeholderSrc } = imageData || {};
  return (
    <SectionContainerRounded
      classNames={{
        sectionContainerRounded: cs(
          classes.blockContactContainer,
          classNames.blockContactContainer
        ),
      }}
      contentType={infoBoxTypes.info}
      isNested={isNested}
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
          level={5}
          className={cs(classes.title, classNames.title)}
        >
          {title}
        </TitleV2>
        <Text
          text={text1}
          classNames={{ text: cs(classes.text, classes.first) }}
        />
        <Text text={text2} classNames={{ text: classes.text }} />

        <div className={cs(classes.buttonsContainer)}>
          {ctaLink.href && (
            <NextBtnLink
              link={ctaLink}
              classNames={{ buttonLink: classes.secondary }}
              target="_blank"
            >
              {secondaryBtnText}
            </NextBtnLink>
          )}
          {phone && (
            <NextBtnLink
              link={{ href: `tel:${phone}` }}
              classNames={{
                buttonLink: cs(classes.primary),
              }}
              target="_blank"
            >
              <span className={classes.primaryBtnText}>
                {primaryBtnText}
              </span>
              <span className={classes.primaryBtnText}>
                {prettyPhone || phone}
              </span>
            </NextBtnLink>
          )}
        </div>
      </div>
    </SectionContainerRounded>
  );
};

BlockContactV2.propTypes = {
  imageData: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    placeholderSrc: PropTypes.string,
  }),
  title: PropTypes.node,
  text1: PropTypes.node,
  text2: PropTypes.node,
  phone: PropTypes.node,
  prettyPhone: PropTypes.string,
  secondaryBtnText: PropTypes.node,
  primaryBtnText: PropTypes.node,
  ctaLink: PropTypes.shape({
    href: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
  }),
  classNames: PropTypes.shape({
    blockContactContainer: classNameType,
    contentContainer: classNameType,
    buttonLink: classNameType,
    buttonsContainer: classNameType,
    text: classNameType,
    title: classNameType,
  }),
  isNested: PropTypes.bool,
};

BlockContactV2.defaultProps = {
  imageData: {
    src: '',
    alt: 'contact-image',
  },
  title: '<h3>Comment peut-on vous aider ?</h3>',
  text1: '',
  text2: '',
  phone: '',
  prettyPhone: '',
  secondaryBtnText: '',
  primaryBtnTextDesktop: '',
  ctaLink: {
    href: '/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  classNames: {},
  isNested: false,
};
