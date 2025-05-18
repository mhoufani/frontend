import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { classNameType } from 'proptypes';
import { Image } from 'ui-core/atoms';

import classes from './index.module.scss';

export const CardBrand = forwardRef(
  (
    {
      classNames,
      component: CardCpnt,
      isActive,
      imageProps: { alt, ...imageProps },
      title,
      withShadow,
      ...props
    },
    ref
  ) => {
    const isActiveClassName = classNames.isActive
      ? { [classNames.isActive]: isActive }
      : {};

    return (
      <CardCpnt
        className={cs(classes.card, classNames.card, {
          [classes.withShadow]: withShadow,
          [classes.isActive]: isActive,
          ...isActiveClassName,
        })}
        ref={ref}
        {...props}
      >
        <Image
          alt={alt}
          className={cs(classes.image, classNames.image)}
          fill
          {...imageProps}
        />
        {title && (
          <p className={cs(classes.title, classNames.title)}>
            {title}
          </p>
        )}
      </CardCpnt>
    );
  }
);

CardBrand.displayName = 'CardBrand';

CardBrand.propTypes = {
  classNames: PropTypes.shape({
    card: classNameType,
    isActive: classNameType,
    image: classNameType,
    title: classNameType,
  }),
  component: PropTypes.string,
  isActive: PropTypes.bool,
  imageProps: PropTypes.shape(Image.propTypes).isRequired,
  title: PropTypes.string,
  withShadow: PropTypes.bool,
};

CardBrand.defaultProps = {
  classNames: {},
  component: 'div',
  imageProps: {},
  isActive: false,
  withShadow: false,
};
