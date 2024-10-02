import React from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import classes from './index.module.scss';

export const Checkbox = ({
  classNames,
  checked,
  label,
  onChange,
  labelProps,
  name,
  error,
  id,
  ...props
}) => {
  return (
    <label
      htmlFor={id}
      className={cs(classes.containerBox, classNames.containerBox, {
        [classes.containerBoxChecked]: checked,
        [classNames.containerBoxChecked]: checked,
      })}
    >
      <span {...labelProps}>{label}</span>
      <input
        onChange={onChange}
        checked={checked}
        type="checkbox"
        id={id}
        name={name}
        {...props}
      />
      <span
        className={cs(
          classes.checkboxMark,
          classNames.checkboxMark,
          error && classes.checkboxError,
          {
            [classes.checkboxMarkActive]: checked,
            [classNames.checkboxMarkActive]: checked,
          }
        )}
      />
    </label>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  classNames: PropTypes.shape({
    containerBox: classNameType,
    checkboxMark: classNameType,
    containerBoxChecked: classNameType,
    checkboxMarkActive: classNameType,
  }),
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  label: PropTypes.string,
  labelProps: PropTypes.object,
  error: PropTypes.bool,
};

Checkbox.defaultProps = {
  classNames: {},
  checked: false,
  error: false,
  label: null,
  labelProps: {},
  onChange: () => null,
};
