import React from 'react';

import PropTypes from 'prop-types';
import cs from 'classnames';
import classes from './index.module.scss';

import { TextV2, Input, Button, Field } from 'ui-core/atoms';

export const EmailAlertPopupV1 = ({
  classNames,
  titlePopup,
  titleFilters,
  isDisabled,
  children,
  placeholder,
  variant,
  labelButton,
  errorMessage,
  handleEmailChange,
  handleFormSubmit,
  emailValue,
}) => {
  return (
    <div
      className={cs(
        classes.emailAlertPopup,
        classNames.emailAlertPopup
      )}
    >
      <TextV2
        element="h2"
        className={cs(classes.title, classNames.title)}
      >
        {titlePopup}
      </TextV2>
      <div className={cs(classes.content, classNames.content)}>
        <div
          className={cs(
            classes.filtersContainer,
            classNames.filtersContainer
          )}
        >
          <TextV2
            element="p"
            className={cs(
              classes.filtersTitle,
              classNames.filtersTitle
            )}
          >
            {titleFilters}
          </TextV2>
          {children}
        </div>
      </div>
      <form onSubmit={handleFormSubmit} className={classes.form}>
        <Field
          error={errorMessage}
          classNames={{
            field: classes.field,
            error: classes.errorMessage,
          }}
        >
          <Input
            classNames={{
              input: classes.input,
            }}
            onChange={handleEmailChange}
            value={emailValue}
            error={!!errorMessage}
            placeholder={placeholder}
          />
        </Field>
        <Button
          variant={variant}
          type="submit"
          disabled={isDisabled}
          classNames={{
            button: cs(classes.buttonSubmit, classNames.buttonSubmit),
          }}
        >
          {labelButton}
        </Button>
      </form>
    </div>
  );
};

EmailAlertPopupV1.propTypes = {
  classNames: PropTypes.shape({
    emailAlertPopup: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    filtersContainer: PropTypes.string,
    filtersTitle: PropTypes.string,
    input: PropTypes.string,
    buttonSubmit: PropTypes.string,
  }),
  titlePopup: PropTypes.string,
  titleFilters: PropTypes.string,
  children: PropTypes.node,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  labelButton: PropTypes.string,
  handleEmailChange: PropTypes.func,
  emailValue: PropTypes.string,
  handleFormSubmit: PropTypes.func,
  errorMessage: PropTypes.string,
};

EmailAlertPopupV1.defaultProps = {
  onPopupClose: () => {},
  classNames: {},
  titlePopup: null,
  titleFilters: null,
  children: null,
  placeholder: null,
  variant: null,
  labelButton: null,
  handleEmailChange: () => {},
  emailValue: null,
  handleFormSubmit: () => {},
  errorMessage: null,
};
