import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import classes from '../index.module.scss';

const Checkbox = ({
  classNames,
  checked,
  label,
  onChange,
  labelProps,
  name,
  error,
  ...props
}) => {
  return (
    <label
      htmlFor={name}
      className={cs(classes.checkbox, classNames.checkbox, {
        [classes.checked]: checked,
      })}
      {...labelProps}
    >
      <input
        onChange={onChange}
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        {...props}
      />
      <span className={cs(classes.mark, classNames.mark)} />
    </label>
  );
};

Checkbox.propTypes = {
  classNames: PropTypes.shape({
    checkbox: classNameType,
    mark: classNameType,
    checked: classNameType,
  }),
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  label: PropTypes.string,
  labelProps: PropTypes.object,
  name: PropTypes.string,
  error: PropTypes.bool,
};

Checkbox.defaultProps = {
  classNames: {},
  checked: false,
  label: null,
  name: '',
  labelProps: {},
  onChange: () => null,
};

export default Checkbox;
