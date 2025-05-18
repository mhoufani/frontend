import React from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import { Label } from 'ui-core/atoms';

import classes from './index.module.scss';

export const Field = ({
  children,
  classNames,
  error,
  labelProps,
}) => (
  <div
    className={cs(
      classes.field,
      error && classes.errorField,
      classNames.field
    )}
  >
    {labelProps.text && (
      <Label
        {...labelProps}
        classNames={{ label: cs(classes.label, classNames.label) }}
      />
    )}
    <div className={cs(classes.container, classNames.container)}>
      {children}
    </div>
    {error && (
      <div
        className={cs(classes.error, classNames.error)}
        dangerouslySetInnerHTML={{ __html: error }}
      />
    )}
  </div>
);

Field.propTypes = {
  children: PropTypes.node,
  error: PropTypes.string,
  classNames: PropTypes.shape({
    field: classNameType,
    container: classNameType,
    error: classNameType,
  }),
  labelProps: PropTypes.shape({
    htmlFor: PropTypes.string,
    text: PropTypes.string,
  }),
};

Field.defaultProps = {
  classNames: {},
  children: '',
  error: null,
  labelProps: {},
};
