import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import ArrowBottomIcon from 'svgs/arrow-bottom-icon.svg';

import classes from './index.module.scss';

export const Select = ({
  classNames,
  disabled,
  children,
  placeholder,
  options,
  value,
  ...props
}) => {
  return (
    <div
      className={cs(
        classes.container,
        classNames.container,
        disabled && classes.disabled
      )}
    >
      <select
        className={cs(classes.select, classNames.select, {
          [classes.placeholder]: !value,
        })}
        value={value || ''}
        disabled={disabled}
        {...props}
      >
        {placeholder && (
          <option value={''} disabled selected>
            {placeholder}
          </option>
        )}
        {children
          ? children
          : options.map(({ value, label, disabled, selected }) => (
              <option
                key={value}
                value={value}
                disabled={disabled}
                selected={selected}
              >
                {label}
              </option>
            ))}
      </select>
      <ArrowBottomIcon
        className={cs(classes.arrowIcon, classNames.arrowIcon)}
      />
    </div>
  );
};

Select.propTypes = {
  children: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      selected: PropTypes.bool,
      disabled: PropTypes.bool,
    })
  ),
  value: PropTypes.string,
  placeholder: PropTypes.string,
  classNames: PropTypes.shape({
    container: classNameType,
    select: classNameType,
    arrowIcon: classNameType,
  }),
  disabled: PropTypes.bool,
};

Select.defaultProps = {
  classNames: {},
  children: null,
};
