import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { useOnScreen } from 'hooks';
import { classNameType } from 'proptypes';
import classes from './index.module.scss';
import { LoadingSpinner } from 'ui-core/atoms';

const events = {
  ERROR: 'error',
  LOADING: 'loading',
  LOADED: 'loaded',
};

export const Picture = ({
  src,
  alt,
  sources,
  classNames,
  placeholderSrc,
  hasLoader,
  ...props
}) => {
  const [status, setStatus] = useState(events.LOADING);
  const [currentSrc, setCurrentSrc] = useState(null);
  const currentRef = useRef(null);
  const isVisible = useOnScreen(currentRef);
  const fileType = `image/${src.substring(src.lastIndexOf('.') + 1)}`;

  const handleLoad = useCallback(() => {
    setStatus(events.LOADED);
  }, []);

  const handleError = useCallback(() => {
    setStatus(events.ERROR);
    setCurrentSrc(placeholderSrc);
  }, [placeholderSrc]);

  useEffect(() => {
    if (isVisible && !currentSrc) {
      setCurrentSrc(src);
    }
  }, [isVisible, src, currentSrc]);

  return (
    <div
      className={cs(classes.image, classNames.image, {
        ...(currentSrc === placeholderSrc && {
          [classes.imageOnError]: true,
          [classNames.imageOnError]: true,
        }),
      })}
      ref={currentRef}
    >
      {hasLoader && status === events.LOADING && (
        <div
          className={cs(
            classes.loaderContainer,
            classNames.loaderContainer
          )}
        >
          <LoadingSpinner
            classNames={{ content: classes.loaderContent }}
          />
        </div>
      )}
      <picture>
        {Array.isArray(sources) ? (
          sources.map(({ type, srcSet, ...rest }, index) => (
            <source
              key={index}
              type={type || fileType}
              srcSet={currentSrc !== placeholderSrc && srcSet}
              {...rest}
            />
          ))
        ) : (
          <source
            srcSet={currentSrc !== placeholderSrc && src}
            type={fileType}
          />
        )}
        <img
          className={cs(classes.img, classNames.img, {
            ...(currentSrc === placeholderSrc && {
              [classes.imgOnError]: true,
              [classNames.imgOnError]: true,
            }),
            [classes.entered]: status === events.LOADED || !hasLoader,
          })}
          src={currentSrc}
          onLoad={handleLoad}
          onError={handleError}
          alt={currentSrc === placeholderSrc ? 'placeholder' : alt}
          {...props}
        />
      </picture>
    </div>
  );
};

Picture.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  classNames: PropTypes.shape({
    image: classNameType,
    img: classNameType,
    loaderContainer: classNameType,
    loader: classNameType,
    imageOnError: classNameType,
    imgOnError: classNameType,
  }),
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      srcSet: PropTypes.string,
      media: PropTypes.string,
      sizes: PropTypes.string,
    })
  ),
  srcOnError: PropTypes.string,
  placeholderSrc: PropTypes.string,
  hasLoader: PropTypes.bool,
};

Picture.defaultProps = {
  src: '',
  alt: '',
  classNames: {},
  placeholderSrc: '/svg/car-placeholder.svg',
  sources: undefined,
  hasLoader: true,
};
