import { useState } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import classes from './index.module.scss';
import { TitleV2, Input, Label, Select, Field } from 'ui-core/atoms';
import {
  RadioButtonGroup,
  InputNumber,
  InputPhoneV2,
} from 'ui-core/molecules';

export const FormField = ({
  value,
  onChangeHandler,
  field,
  classNames,
}) => {
  const {
    subtitle,
    options,
    selectOptions,
    name,
    type,
    placeholder,
    label,
    id,
    isHalfWidth,
    isValid,
    errorText,
  } = field;
  const [isWrongEmail, setIsWrongEmail] = useState(false);
  const [isWrongPhone, setIsWrongPhone] = useState(false);

  return (
    <div
      className={cs(
        classes.container,
        classNames.container,
        isHalfWidth && classes.halfWidth,
        selectOptions?.length && classes.selectWidth
      )}
    >
      {subtitle && (
        <TitleV2
          element="legend"
          className={cs(classes.subtitle, classNames.subtitle)}
          classNameSecondary={cs(
            classes.secondary,
            classNames.secondary
          )}
          {...(options &&
            value && {
              secondary: options
                .find(option => option.value === value)
                .label.toLowerCase(),
            })}
        >
          {subtitle}
        </TitleV2>
      )}
      <div
        className={cs(classes.subContainer, classNames.subContainer)}
      >
        {label && <Label text={label} htmlFor={id} />}
        {options && (
          <RadioButtonGroup
            options={options}
            name={name}
            selectedOption={value}
            onChangeHandler={onChangeHandler}
          />
        )}
        {selectOptions && (
          <Select
            placeholder={placeholder}
            options={selectOptions}
            name={name}
            value={value}
            onChange={onChangeHandler}
          />
        )}
        {['text'].includes(type) && (
          <Input
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChangeHandler}
            required
            classNames={{
              container: cs(
                classes.inputContainer,
                classNames.inputContainer
              ),
              input: cs(classes.input, classNames.input),
            }}
          />
        )}
        {['email'].includes(type) && (
          <Field
            error={isWrongEmail ? errorText : null}
            classNames={{
              error: classes.fieldError,
              field: classes.field,
            }}
          >
            <Input
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={onChangeHandler}
              onBlur={() => {
                setIsWrongEmail(!isValid(value));
              }}
              required
              classNames={{
                container: cs(
                  classes.inputContainer,
                  isWrongEmail && classes.errorInputContainer,
                  classNames.inputContainer
                ),
                input: cs(classes.input, classNames.input),
              }}
            />
          </Field>
        )}
        {type === 'tel' && (
          <Field
            error={isWrongPhone ? errorText : null}
            classNames={{
              error: classes.fieldError,
              field: classes.field,
            }}
          >
            <InputPhoneV2
              name={name}
              value={value}
              type={type}
              placeholder={placeholder}
              onChange={onChangeHandler}
              onBlur={() => {
                setIsWrongPhone(!isValid(value));
              }}
              classNames={{
                container: cs(
                  classes.inputContainer,
                  isWrongPhone && classes.errorInputContainer,
                  classNames.inputContainer
                ),
                input: cs(classes.input, classNames.input),
                prefixSelectContainer: cs(
                  classes.prefixSelectContainer,
                  classNames.prefixSelectContainer
                ),
                prefixSelect: cs(
                  classes.prefixSelect,
                  classNames.prefixSelect
                ),
                prefix: cs(classes.prefix, classNames.prefix),
                current: cs(
                  classes.prefixButton,
                  classNames.prefixButton
                ),
              }}
            />
          </Field>
        )}
        {type === 'number' && (
          <InputNumber
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChangeHandler}
            classNames={{
              container: cs(
                classes.inputContainer,
                classNames.inputContainer
              ),
              input: cs(classes.input, classNames.input),
            }}
          />
        )}
        {type === 'textarea' && (
          <textarea
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChangeHandler}
            className={cs(classes.textarea, classNames.textarea)}
          >
            {value}
          </textarea>
        )}
      </div>
    </div>
  );
};

FormField.propTypes = {
  onChangeHandler: PropTypes.func,
  value: PropTypes.string,
  classNames: PropTypes.shape({
    subtitle: classNameType,
    container: classNameType,
    secondary: classNameType,
    subContainer: classNameType,
    inputContainer: classNameType,
    input: classNameType,
    prefixSelectContainer: classNameType,
    prefixSelect: classNameType,
    prefix: classNameType,
    prefixButton: classNameType,
    textarea: classNameType,
  }),
  field: PropTypes.shape({
    label: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    subtitle: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    isHalfWidth: PropTypes.bool,
    isValid: PropTypes.func,
    errorText: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
        id: PropTypes.string,
      })
    ),
    selectOptions: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
        selected: PropTypes.bool,
        disabled: PropTypes.bool,
      })
    ),
  }),
};

FormField.defaultProps = { classNames: {} };
