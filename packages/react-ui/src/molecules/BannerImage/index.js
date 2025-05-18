import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import { useMinMediaQuery } from 'hooks';
import { Image } from 'ui-core/atoms';

import classes from './index.module.scss';

export const BannerImage = ({
  classNames,
  defaultWidth,
  element: Element,
  elementProps,
  images,
  imageProps: _imageProps,
}) => {
  const minWidths = useMemo(() => Object.keys(images), [images]);
  const minWidth = useMinMediaQuery(minWidths, { defaultWidth });
  const [imageProps, setImageProps] = useState(
    images?.[defaultWidth]
  );

  useEffect(() => {
    setImageProps(images?.[minWidth]);
  }, [images, minWidth]);

  return (
    imageProps && (
      <Element
        className={cs(classes.banner, classNames.banner)}
        {...elementProps}
      >
        <Image
          {..._imageProps}
          {...imageProps}
          alt={imageProps.alt}
          className={cs(classes.image, classNames.image)}
        />
      </Element>
    )
  );
};

BannerImage.defaultProps = {
  classNames: {},
  element: 'div',
  elementProps: {},
  images: {},
  imageProps: {},
};

BannerImage.propTypes = {
  classNames: PropTypes.shape({
    banner: classNameType,
    image: classNameType,
  }),
  defaultWidth: PropTypes.number,
  element: PropTypes.element,
  elementProps: PropTypes.object,
  images: PropTypes.object,
  imageProps: PropTypes.object,
};
