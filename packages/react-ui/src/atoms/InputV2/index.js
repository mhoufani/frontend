import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';

import classes from './index.module.scss';

export const InputV2 = ({ classNames, isErrored, ...props }) => {
  return (
    <input
      {...props}
      className={cs(classes.input, classNames.input, {
        [cs(classes.isErrored, classNames.isErrored)]: isErrored,
      })}
    />
  );
};

InputV2.defaultProps = {
  classNames: {},
};

InputV2.propTypes = {
  classNames: PropTypes.shape({
    isErrored: classNameType,
    input: classNameType,
  }),
  isErrored: PropTypes.bool,
};
