import { HTMLProps, ChangeEvent } from 'react';

import cs from 'classnames';
import classes from './index.module.scss';

export interface ClassNamesProps {
  containerBox?: string;
  checkboxMark?: string;
  containerBoxChecked?: string;
  checkboxMarkActive?: string;
}

export interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  id: string;
  classNames?: ClassNamesProps;

  checked?: boolean;
  isErrored?: boolean;
  labelMessage?: string;
  labelProps?: object;
  errorMessage?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  id,
  classNames = {},
  checked = false,
  labelMessage,
  onChange = () => undefined,
  labelProps = {},
  name,
  isErrored = false,
  ...props
}: CheckboxProps) => {
  return (
    <label
      htmlFor={id}
      className={cs(
        classes.containerBox,
        classNames.containerBox,
        {
          [classes.containerBoxChecked]: checked,
        },
        checked && classNames.containerBoxChecked,
      )}
    >
      <span {...labelProps}>{labelMessage}</span>
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
          isErrored && classes.checkboxError,
          {
            [classes.checkboxMarkActive]: checked,
          },
          checked && classNames.checkboxMarkActive,
        )}
      />
    </label>
  );
};

export default Checkbox;
