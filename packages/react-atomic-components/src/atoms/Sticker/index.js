import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';

import cs from 'classnames';

import classes from './index.module.scss';

export const Sticker = ({ text, variant, classNames }) => {
  return (
    <span
      className={cs(
        classes.sticker,
        classes[variant],
        classNames.sticker
      )}
    >
      {text}
    </span>
  );
};
Sticker.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  classNames: PropTypes.shape({
    sticker: classNameType,
  }),
};

Sticker.defaultProps = {
  text: 'Mon Badge',
  variant: 'default',
  classNames: {},
};
