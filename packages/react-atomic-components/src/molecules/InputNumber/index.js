import PropTypes from 'prop-types';
import cs from 'classnames';

import { Input } from 'ui-core/atoms';

import classes from './index.module.scss';

export const InputNumber = ({
  classNames,
  maxLength,
  value,
  onChange,
  showStep,
  ...props
}) => {
  const handleChange = event => {
    const {
      target: { name, value },
    } = event;
    const cleanValue = value.slice(0, maxLength || value.length);

    onChange({ target: { name, value: cleanValue } });
  };

  // Prevent input of e, E
  const handleKeyPress = event => {
    if (['e', 'E'].includes(event.key)) {
      event.preventDefault();
    }
  };

  // Prevent copy/paste of e, E
  const handlePaste = event => {
    const { clipboardData } = event || window;
    const txt = clipboardData.getData('text');
    const numberReg = /^[0-9]*$/;

    if (!numberReg.test(txt)) {
      event.preventDefault();

      return true;
    } else {
      return false;
    }
  };

  return (
    <Input
      {...props}
      classNames={{
        ...classNames,
        input: cs(classes.input, classNames.input, {
          [classes.withStep]: showStep,
        }),
      }}
      type="number"
      onChange={handleChange}
      onPaste={handlePaste}
      onKeyPress={handleKeyPress}
      value={value}
    />
  );
};

InputNumber.propTypes = {
  ...Input.propTypes,
  showStep: PropTypes.bool,
  maxLength: PropTypes.number,
};

InputNumber.defaultProps = {
  ...Input.defaultProps,
  showStep: false,
};
