import { useEffect, useState } from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import classes from './index.module.scss';

export const Input = ({
  before,
  classNames,
  error,
  onFocus,
  onBlur,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    if (focus) onFocus();
  }, [focus, onFocus]);

  useEffect(() => {
    if (blur) onBlur();
  }, [blur, onBlur]);

  return (
    <div
      className={cs(
        classes.container,
        error && classes.invalid,
        focus && classes.focus,
        classNames.container
      )}
    >
      {before}
      <input
        onFocus={() => {
          setFocus(true);
          setBlur(false);
        }}
        onBlur={() => {
          setFocus(false);
          setBlur(true);
        }}
        className={cs(classes.input, classNames.input)}
        {...props}
      />
    </div>
  );
};

Input.propTypes = {
  before: PropTypes.node,
  classNames: PropTypes.shape({
    container: classNameType,
    input: classNameType,
  }),
  error: PropTypes.bool,
  name: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  before: '',
  classNames: {},
  error: false,
  name: '',
  onFocus: () => {},
  onBlur: () => {},
  placeholder: '',
  type: 'text',
  value: '',
};
