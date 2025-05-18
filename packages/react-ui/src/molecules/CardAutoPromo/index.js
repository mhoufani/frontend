import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import { Image } from 'ui-core/atoms';

import classes from './index.module.scss';

export const CardAutoPromo = ({
  classNames,
  element: Element,
  elementProps,
  imageProps,
}) => {
  return (
    imageProps && (
      <Element
        className={cs(classes.card, classNames.card)}
        {...elementProps}
      >
        <Image
          alt={imageProps.alt}
          className={cs(classes.image, classNames.image)}
          {...imageProps}
        />
      </Element>
    )
  );
};

CardAutoPromo.defaultProps = {
  classNames: {},
  element: 'div',
  elementProps: {},
  imageProps: {},
};

CardAutoPromo.propTypes = {
  classNames: PropTypes.shape({
    card: classNameType,
    image: classNameType,
  }),
  element: PropTypes.element,
  elementProps: PropTypes.object,
  imageProps: PropTypes.object,
};
