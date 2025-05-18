import React, { useRef } from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import CrossIcon from 'svgs/cross-icon.svg';
import GlassIcon from 'svgs/glass-icon.svg';
import classes from './index.module.scss';

export const InputSearch = ({
  value: _value,
  classNames,
  controlled,
  onSubmit,
  onReset,
  withReset,
  hasIcon,
  ...props
}) => {
  const value = useRef('');

  return (
    <div className={cs(classes.inputSearch, classNames.inputSearch)}>
      <input
        type="text"
        className={cs(classes.input, classNames.input, {
          [classes.inputWithReset]: withReset,
        })}
        value={controlled ? _value : value.current}
        {...props}
      />
      {withReset && !!(controlled ? _value : value.current) && (
        <button
          type="button"
          className={cs(classes.btnReset, classNames.btnReset)}
          onClick={
            controlled
              ? onReset
              : () => {
                  value.current = '';
                }
          }
        >
          <CrossIcon className={cs(classes.crossIcon)} />
        </button>
      )}
      <button
        type="button"
        className={cs(classes.btnSubmit, classNames.btnSubmit)}
        onClick={onSubmit}
      >
        {hasIcon && (
          <GlassIcon
            className={cs(classes.glassIcon, classNames.glassIcon)}
          />
        )}
      </button>
    </div>
  );
};

InputSearch.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  withReset: PropTypes.bool,
  controlled: PropTypes.bool,
  classNames: PropTypes.shape({
    inputSearch: classNameType,
    input: classNameType,
    glassIcon: classNameType,
    crossIcon: classNameType,
    btnReset: classNameType,
    btnSubmit: classNameType,
  }),
  hasIcon: PropTypes.bool,
};

InputSearch.defaultProps = {
  value: '',
  onSubmit: () => null,
  onReset: () => null,
  controlled: true,
  withReset: false,
  classNames: {},
  hasIcon: true,
};
