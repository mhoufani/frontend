import React from 'react';
import cs from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import { text, ucFirst } from 'util-common/text';
import { CarLink, Picture } from 'ui-core/atoms';

import ArrowBottom from 'svgs/arrow-bottom-icon.svg';
import QuoteIcon from 'svgs/quote.svg';

import classes from './index.module.scss';

export const TestimonialCard = ({
  title,
  message: _message,
  name,
  picture,
  model,
  link,
  sign,
  city,
  textEllipseOnly,
  showAllContent,
  readMoreLimitCharacters,
  readMoreMessage,
  classNames,
  onClick,
}) => {
  const [message, messageTruncate] =
    textEllipseOnly || showAllContent
      ? [_message]
      : (_message || '')
          .replace(/\n/g, ' ')
          .match(new RegExp(`.{1,${readMoreLimitCharacters}}`, 'g'));
  const isMessageExceed =
    textEllipseOnly || showAllContent
      ? false
      : !!(messageTruncate || '').length;

  return (
    <div
      className={cs(
        classes.testimonialCard,
        classNames.testimonialCard,
        {
          [classes.showAllContent]: showAllContent,
        }
      )}
    >
      <div className={classes.iconWrapper}>
        <QuoteIcon className={cs(classes.comma)} />
      </div>
      {title && (
        <div className={cs(classes.title)} itemProp="name">
          {title}
        </div>
      )}
      <div
        itemProp="reviewBody"
        className={cs(classes.message, classNames.message, {
          [classes.showAllContent]: showAllContent,
          [classes.textTruncate]: !showAllContent,
          [classes.textEllipse]: !showAllContent && textEllipseOnly,
        })}
      >
        {isMessageExceed ? `${message}...` : message}
        {isMessageExceed && readMoreMessage && (
          <button
            onClick={onClick}
            className={classes.readMoreButton}
          >
            <span>{readMoreMessage || '+'}</span>
            <ArrowBottom className={cs(classes.arrowBottom)} />
          </button>
        )}
      </div>
      <div className={cs(classes.bottomCard)}>
        <Picture
          src={picture}
          classNames={{
            image: classes.imgContainer,
            img: classes.image,
          }}
          alt="image de profil"
        />
        <div className={cs(classes.author)} title={sign}>
          <span className={cs(classes.name)} itemProp="author">
            {name}
            {!!city && '.'}
          </span>
          <span className={cs(classes.city)}>{city}</span>
          <span
            itemProp="itemReviewed"
            itemScope
            itemType="https://www.schema.org/Car"
          >
            <Link {...link} legacyBehavior>
              <CarLink
                label={ucFirst(model)}
                title={ucFirst(model)}
                itemProp="url"
                classNames={{
                  carLink: classes.carLink,
                }}
              >
                <span itemProp="name">{ucFirst(model)}</span>
              </CarLink>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

TestimonialCard.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  name: PropTypes.string,
  model: PropTypes.string,
  picture: PropTypes.string,
  city: PropTypes.string,
  link: PropTypes.shape({
    href: PropTypes.string.isRequired,
  }),
  sign: PropTypes.string,
  readMoreLimitCharacters: PropTypes.number,
  readMoreMessage: PropTypes.string,
  textEllipseOnly: PropTypes.bool,
  classNames: PropTypes.shape({
    testimonialCard: classNameType,
    message: classNameType,
  }),
  onClick: PropTypes.func,
  showAllContent: PropTypes.bool,
};

TestimonialCard.defaultProps = {
  textEllipseOnly: true,
  title: '',
  message: '',
  name: '',
  model: '',
  picture: '',
  city: '',
  sign: '',
  link: {
    href: '#',
  },
  readMoreLimitCharacters: 200,
  readMoreMessage: '',
  showAllContent: false,
  classNames: {},
  onClick: () => null,
};
