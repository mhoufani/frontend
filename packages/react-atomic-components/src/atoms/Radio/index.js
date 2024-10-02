import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import classes from './index.module.scss';

export const Radio = ({
  classNames,
  checked,
  labelMessage,
  onChange,
  name,
  disabled,
  id,
  value,
  ...props
}) => {
  return (
    <label
      htmlFor={id ? id : name}
      className={cs(
        classes.radio,
        classNames.radio,
        disabled && classes.disabled,
        disabled && classNames.disabled,
        checked && classes.checked,
        checked && classNames.checked
      )}
      {...props}
    >
      <input
        onChange={onChange}
        checked={checked}
        type="radio"
        name={name}
        disabled={disabled}
        id={id}
        value={value}
      />
      <span className={cs(classes.mark, classNames.mark)} />
      {labelMessage}
    </label>
  );
};

Radio.propTypes = {
  classNames: PropTypes.shape({
    radio: classNameType,
    mark: classNameType,
    checked: classNameType,
    disabled: classNameType,
  }),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  labelMessage: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
};

Radio.defaultProps = {
  classNames: {},
  disabled: false,
  checked: false,
  labelMessage: null,
  name: '',
  onChange: () => null,
  id: null,
};
