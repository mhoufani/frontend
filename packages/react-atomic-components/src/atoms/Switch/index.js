import React, { useState } from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import classes from './index.module.scss';

export const Switch = ({
  checked: _checked,
  onClick,
  controlled,
  rounded,
  classNames,
  switchActiveMessage,
  switchInactiveMessage,
  dataQa,
  label,
}) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    controlled ? onClick(!_checked) : setChecked(!checked);
  };

  const isActive = controlled ? _checked : checked;

  return (
    <label
      htmlFor={`switchInput${dataQa}`}
      className={cs(
        classes.switchContainer,
        classNames.switchContainer
      )}
    >
      <input
        id={`switchInput${dataQa}`}
        defaultChecked={checked}
        type="checkbox"
        className={cs(classes.input)}
        aria-label={`${switchActiveMessage} / ${switchInactiveMessage}`}
      />
      <span
        aria-hidden="true"
        data-qa={dataQa}
        className={cs(
          classes.switchButtonContainer,
          classNames.switchButtonContainer,
          {
            [classes.round]: rounded,
            [classes.isActive]: isActive,
            [classNames.isActive]: isActive,
          }
        )}
        onClick={handleCheck}
      />
      <span
        aria-hidden="true"
        className={cs(classes.switchMsg, isActive && classes.active)}
        onClick={handleCheck}
      >
        {isActive ? switchActiveMessage : switchInactiveMessage}
      </span>
      {label && (
        <span className={cs(classes.label, classNames.label)}>
          {label}
        </span>
      )}
    </label>
  );
};

Switch.propTypes = {
  onClick: PropTypes.func,
  controlled: PropTypes.bool,
  checked: PropTypes.bool,
  rounded: PropTypes.bool,
  classNames: PropTypes.shape({
    switchContainer: PropTypes.string,
    switchButtonContainer: PropTypes.string,
    isActive: PropTypes.string,
    label: PropTypes.string,
  }),
  switchActiveMessage: PropTypes.string,
  switchInactiveMessage: PropTypes.string,
  dataQa: PropTypes.string,
  label: PropTypes.string,
};

Switch.defaultProps = {
  onClick: () => null,
  controlled: false,
  checked: false,
  switchActiveMessage: 'Oui',
  switchInactiveMessage: 'Non',
  classNames: {},
  rounded: true,
  label: null,
};
