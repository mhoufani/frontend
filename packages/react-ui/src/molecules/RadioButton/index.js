import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import classes from './index.module.scss';
import { Radio } from 'ui-core/atoms';

export const RadioButton = ({
  option,
  checked,
  name,
  onChangeHandler,
  classNames,
  ...props
}) => {
  const { label, value = '', id } = option;

  return (
    <Radio
      element="radio"
      labelMessage={label}
      value={value}
      checked={checked}
      name={name}
      onChange={onChangeHandler}
      id={id}
      {...props}
      classNames={{
        radio: cs(classes.radio, classNames.radio),
        checked: cs(classes.checked, classNames.checked),
        mark: cs(classes.mark, classNames.mark),
      }}
    />
  );
};

RadioButton.propTypes = {
  option: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func,
  classNames: PropTypes.shape({
    radio: classNameType,
    mark: classNameType,
    checked: classNameType,
    disabled: classNameType,
  }),
};

RadioButton.defaultProps = {
  classNames: {},
  onChange: () => null,
};
