import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import cs from 'classnames';

import classes from './index.module.scss';

export const Label = ({ text, classNames, htmlFor, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cs(classes.label, classNames.label)}
      {...props}
    >
      {text}
    </label>
  );
};

Label.propTypes = {
  classNames: PropTypes.shape({
    label: classNameType,
  }),
  htmlFor: PropTypes.string,
  text: PropTypes.string,
};

Label.defaultProps = {
  classNames: {},
};
