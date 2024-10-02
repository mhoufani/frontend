import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { usePhoneInput } from 'hooks';

import FlagAT from 'svgs/flag-at.svg';
import FlagBE from 'svgs/flag-be.svg';
import FlagDE from 'svgs/flag-de.svg';
import FlagES from 'svgs/flag-es.svg';
import FlagFR from 'svgs/flag-fr.svg';
import FlagGB from 'svgs/flag-gb.svg';
import FlagIT from 'svgs/flag-it.svg';
import FlagNL from 'svgs/flag-nl.svg';
import FlagPT from 'svgs/flag-pt.svg';

import { classNameType } from 'proptypes';
import classes from './index.module.scss';
import { PhonePrefixSelect } from 'ui-core/molecules';

const defaultPrefix = '+33';

export const defaultCountries = {
  '+49': { value: '+49', label: 'Allemagne', Icon: FlagDE },
  '+43': { value: '+43', label: 'Autriche', Icon: FlagAT },
  '+32': { value: '+32', label: 'Belgique', Icon: FlagBE },
  '+34': { value: '+34', label: 'Espagne', Icon: FlagES },
  '+33': { value: '+33', label: 'France', Icon: FlagFR },
  '+39': { value: '+39', label: 'Italie', Icon: FlagIT },
  '+31': { value: '+31', label: 'Pays-Bas', Icon: FlagNL },
  '+351': { value: '+351', label: 'Portugal', Icon: FlagPT },
  '+44': { value: '+44', label: 'Royaume-Uni', Icon: FlagGB },
};

export const InputPhoneV2 = ({
  classNames,
  countries: _countries = defaultCountries,
  isErrored,
  name,
  onChange,
  placeholder,
  prefix: propsPrefix,
  type,
  value: propsValue,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const {
    countries,
    onPrefixChange: handlePrefixChange,
    onValueChange: handleChange,
    state,
  } = usePhoneInput({
    countries: _countries,
    prefix: propsPrefix,
    value: propsValue,
  });

  const handleToggle = open => setOpen(open);

  useEffect(() => {
    onChange({ target: { name, value: state.value } }, state);
  }, [state.prefix, state.value]);

  return (
    <div
      className={cs(classes.container, classNames.container, {
        [classes.isErrored]: isErrored,
        [classes.isOpened]: open,
      })}
    >
      <PhonePrefixSelect
        classNames={{
          ...classNames,
          menu: cs(
            classes.phonePrefixSelect_menu,
            classNames.phonePrefixSelect_menu
          ),
        }}
        countries={countries}
        disabled={props.disabled}
        onSelect={handlePrefixChange}
        onToggle={handleToggle}
        value={state.prefix}
      />
      <input
        className={cs(classes.input, classNames.input)}
        name={name}
        placeholder={placeholder}
        type={type}
        value={state.value}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

InputPhoneV2.defaultProps = {
  classNames: {},
  isErrored: false,
  onChange: () => {},
  placeholder: '',
  prefix: defaultPrefix,
  value: '',
  type: 'tel',
};

InputPhoneV2.propTypes = {
  defaultPrefix: PropTypes.string,
  isErrored: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  prefix: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  classNames: PropTypes.shape({
    input: classNameType,
    container: classNameType,
    phonePrefixSelect_menu: classNameType,
    prefixSelectContainer: classNameType,
    prefixSelect: classNameType,
    prefix: classNameType,
    current: classNameType,
  }),
};
