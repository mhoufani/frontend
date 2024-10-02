import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import classes from './index.module.scss';

export const Image = ({
  alt,
  fill,
  loader,
  src: _src,
  srcOnError,
  ...props
}) => {
  const [src, setSrc] = useState(loader({ src: _src }));

  useEffect(() => {
    setSrc(loader({ src: _src }));
  }, [loader, _src]);

  const onError = () =>
    srcOnError && setSrc(loader({ src: srcOnError }));

  return (
    <img
      alt={alt}
      className={cs({ [classes.fill]: fill })}
      onError={onError}
      src={src}
      {...props}
    />
  );
};

Image.defaultProps = {
  loader: ({ src }) => src,
  loading: 'lazy',
};

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  fill: PropTypes.bool,
  loader: PropTypes.func,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  src: PropTypes.string.isRequired,
  srcOnError: PropTypes.string,
};
