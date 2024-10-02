import PropTypes from 'prop-types';

import cs from 'classnames';
import classes from './index.module.scss';

export const LabelFilter = ({ label, classNames }) => {
  return (
    <span className={cs(classes.label, classNames.label)}>
      {label}
    </span>
  );
};

LabelFilter.propTypes = {
  label: PropTypes.string,
  classNames: PropTypes.shape({
    label: PropTypes.string,
  }),
};

LabelFilter.defaultProps = {
  label: '',
  classNames: {},
};
