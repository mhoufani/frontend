import PropTypes from 'prop-types';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import cs from 'classnames';
import { useForm } from 'hooks';
import { classNameType } from 'proptypes';

import {
  Button,
  Field,
  InputV2,
  Label,
  TitleV2,
} from 'ui-core/atoms';

import {
  InputPhoneV2,
  InputPlaceSuggestions,
} from 'ui-core/molecules';

import ArrowIcon from 'svgs/arrow.svg';
import AccompagnementIcon from 'svgs/accompagnement.svg';
import RecondiIcon from 'svgs/recondi.svg';
import SatisfactionIcon from 'svgs/satisfait.svg';
import GarantieIcon from 'svgs/garanties.svg';

import { ReInsurances } from './ReInsurances';
import classes from './index.module.scss';
import classNames from 'classnames';

export const FormPaymentValidation = forwardRef(
  (
    {
      classNames,
      defaultValues,
      isProfessional,
      labels,
      fieldOptions,
      onChange: _onChange,
      onSubmit: _onSubmit,
      reInsuranceEntries,
      validateButtonContent,
    },
    ref
  ) => {
    const {
      errors,
      onChange,
      onSubmit,
      setErrors,
      setValues,
      values,
    } = useForm({
      defaultValues,
      onChange: _onChange,
      onSubmit: _onSubmit,
      fieldOptions: {
        firstName: { isRequired: true, ...fieldOptions.firstName },
        lastName: { isRequired: true, ...fieldOptions.lastName },
        email: { isRequired: true, ...fieldOptions.email },
        phoneNumber: {
          isRequired: true,
          ...fieldOptions.phoneNumber,
        },
        compagnyName: {
          isRequired: !!isProfessional,
          ...fieldOptions.compagnyName,
        },
        address: { isRequired: true, ...fieldOptions.address },
        postalCode: { isRequired: true, ...fieldOptions.postalCode },
        city: { isRequired: true, ...fieldOptions.city },
        country: { isRequired: true, ...fieldOptions.country },
      },
    });

    const handleChangePhone = (event, { value, phoneNumber }) => {
      setValues(values => ({
        ...values,
        [event.target.name]: !!value ? `${phoneNumber}${value}` : '',
      }));
    };

    const handleSelectAddress = ({
      streetNumber,
      street,
      postalCode,
      city,
      country,
    }) => {
      setValues(values => ({
        ...values,
        address:
          `${streetNumber || ''} ${street || ''}` ||
          values.address ||
          null,
        postalCode: postalCode || values.postalCode || null,
        city: city || values.city || null,
        country: country || values.country || null,
      }));
    };

    return (
      <form onSubmit={onSubmit} ref={ref}>
        <div className={classes.box}>
          <div className={classes.fields}>
            <Field
              classNames={{ field: classes.field }}
              labelProps={{ text: labels.firstName || 'Prénom *' }}
              error={errors.firstName}
            >
              <InputV2
                disabled
                isErrored={!!errors.firstName}
                name="firstName"
                onChange={onChange}
                value={values.firstName}
                {...fieldOptions.firstName?.inputProps}
              />
            </Field>
            <Field
              classNames={{ field: classes.field }}
              labelProps={{ text: labels.lastName || 'Nom *' }}
              error={errors.lastName}
            >
              <InputV2
                disabled
                isErrored={!!errors.lastName}
                name="lastName"
                onChange={onChange}
                value={values.lastName}
                {...fieldOptions.lastName?.inputProps}
              />
            </Field>
            <Field
              classNames={{ field: classes.field }}
              labelProps={{ text: labels.email || 'Email *' }}
              error={errors.email}
            >
              <InputV2
                disabled
                isErrored={!!errors.email}
                name="email"
                onChange={onChange}
                value={values.email}
                {...fieldOptions.email?.inputProps}
              />
            </Field>
            <Field
              classNames={{ field: classes.field }}
              labelProps={{
                text: labels.phoneNumber || 'Téléphone *',
              }}
              error={errors.phoneNumber}
            >
              <InputPhoneV2
                disabled
                isErrored={!!errors.phoneNumber}
                name="phoneNumber"
                onChange={handleChangePhone}
                value={values.phoneNumber}
                {...fieldOptions.phoneNumber?.inputProps}
              />
            </Field>
            {isProfessional && (
              <Field
                classNames={{ field: classes.field }}
                labelProps={{
                  text:
                    labels.compagnyName || "Nom de l'entreprise *",
                }}
                error={errors.compagnyName}
              >
                <InputV2
                  disabled
                  isErrored={!!errors.compagnyName}
                  name="compagnyName"
                  onChange={onChange}
                  value={values.compagnyName}
                  {...fieldOptions.compagnyName?.inputProps}
                />
              </Field>
            )}
            <Field
              classNames={{
                field: cs(classes.field, classes.field_fullWidth),
              }}
              labelProps={{ text: labels.address || 'Adresse *' }}
              error={errors.address}
            >
              <InputPlaceSuggestions
                isErrored={!!errors.address}
                onChange={value =>
                  onChange({ target: { name: 'address', value } })
                }
                onSelect={handleSelectAddress}
                value={values.address}
                {...fieldOptions.address?.inputProps}
              />
            </Field>
            <Field
              classNames={{ field: classes.field }}
              labelProps={{
                text: labels.postalCode || 'Code postal *',
              }}
              error={errors.postalCode}
            >
              <InputV2
                isErrored={!!errors.postalCode}
                name="postalCode"
                onChange={onChange}
                value={values.postalCode}
                {...fieldOptions.postalCode?.inputProps}
              />
            </Field>
            <Field
              classNames={{ field: classes.field }}
              labelProps={{ text: labels.city || 'Ville *' }}
              error={errors.city}
            >
              <InputV2
                isErrored={!!errors.city}
                name="city"
                onChange={onChange}
                value={values.city}
                {...fieldOptions.city?.inputProps}
              />
            </Field>
            <Field
              classNames={{ field: classes.field }}
              labelProps={{ text: labels.country || 'Pays *' }}
              error={errors.country}
            >
              <InputV2
                isErrored={!!errors.country}
                name="country"
                onChange={onChange}
                value={values.country}
                {...fieldOptions.country?.inputProps}
              />
            </Field>
          </div>
          <ReInsurances entries={reInsuranceEntries} />
        </div>
        <Button
          classNames={{
            button: cs(
              classes.validateButton,
              classNames.validateButton
            ),
          }}
          variant="primary"
          type="submit"
        >
          {validateButtonContent}
          <ArrowIcon className={classes.arrowIcon} />
        </Button>
      </form>
    );
  }
);

const FieldOptionType = PropTypes.shape({
  isRequired: PropTypes.bool,
  requiredMessage: PropTypes.bool,
});

FormPaymentValidation.defaultProps = {
  classNames: {},
  defaultValues: {},
  fieldOptions: {},
  isProfessional: false,
  labels: {},
  onChange: () => {},
  onSubmit: () => {},
  validateButtonContent: 'Payer mon accompte',
};

FormPaymentValidation.propTypes = {
  classNames: PropTypes.shape({
    validateButton: classNameType,
  }),
  defaultValues: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    postalCode: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
  }),
  fieldOptions: PropTypes.shape({
    firstName: FieldOptionType,
  }),
  isProfessional: PropTypes.bool,
  labels: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    postalCode: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  reInsuranceEntries: PropTypes.object,
  validateButtonContent: PropTypes.string,
};

const emptyErrorMessage = (value, message) =>
  !value ? message || 'Champs requis. ' : null;
