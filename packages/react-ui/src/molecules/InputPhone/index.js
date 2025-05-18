import React, { useEffect, useState } from 'react';
import escapeRegexp from 'escape-string-regexp';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';

import FlagAT from 'svgs/flag-at.svg';
import FlagBE from 'svgs/flag-be.svg';
import FlagDE from 'svgs/flag-de.svg';
import FlagES from 'svgs/flag-es.svg';
import FlagFR from 'svgs/flag-fr.svg';
import FlagGB from 'svgs/flag-gb.svg';
import FlagIT from 'svgs/flag-it.svg';
import FlagNL from 'svgs/flag-nl.svg';
import FlagPT from 'svgs/flag-pt.svg';
import { PhonePrefixSelect } from 'ui-core/molecules';
import { Input } from 'ui-core/atoms';

const defaultPrefix = '+33';

// todo : chunk icon import
export const countries = {
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

export const InputPhone = props => {
  const [state, setState] = useState({ prefix: defaultPrefix });
  const {
    prefix: propsPrefix,
    value: propsValue,
    onPrefixChange,
    classNames,
  } = props;

  useEffect(() => {
    let newPrefix = countries[propsPrefix]
      ? propsPrefix
      : defaultPrefix;
    const re = new RegExp(`^${escapeRegexp(propsPrefix)}`);

    if (!`${propsValue || ''}`.match(re)) {
      Object.keys(countries).some(p => {
        const pRe = new RegExp(`^${escapeRegexp(p)}`);
        const goodPrefix = `${propsValue || ''}`.match(pRe);

        if (goodPrefix) {
          newPrefix = p;
          onPrefixChange(p);
        }

        return !!goodPrefix;
      });
    }

    setState({
      prefix: propsPrefix,
      value: `${propsValue || ''}`.replace(newPrefix, ''),
    });
  }, [propsPrefix, propsValue, onPrefixChange]);

  const handleSelect = (prefix, e) => {
    setState({ prefix });
    onPrefixChange(prefix, e);
  };

  const handleChange = ({ target: { name, value } }) => {
    const { onChange } = props;
    const { prefix } = state;

    setState({ ...state, value, name });
    const countriesKeys = Object.keys(countries)
      .map(key => `\\${key}`)
      .join('|');
    const removePrefixRegex = new RegExp(countriesKeys, 'gm');
    onChange({
      target: {
        name,
        value:
          value && value.trim()
            ? `${prefix}${value.replace(removePrefixRegex, '')}`
            : '',
      },
    });
  };

  const { type = 'tel', name, placeholder, error, onBlur } = props;
  const { prefix, value } = state;

  return (
    <div>
      <Input
        before={
          <PhonePrefixSelect
            countries={countries}
            onSelect={handleSelect}
            value={prefix}
            classNames={classNames}
          />
        }
        name={name}
        placeholder={placeholder}
        error={error}
        onBlur={onBlur}
        type={type}
        value={value}
        onChange={handleChange}
        classNames={classNames}
      />
    </div>
  );
};

InputPhone.propTypes = {
  prefix: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onPrefixChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  classNames: PropTypes.shape({
    container: classNameType,
    input: classNameType,
  }),
};

InputPhone.defaultProps = {
  prefix: defaultPrefix,
  value: '',
  type: 'text',
  name: '',
  placeholder: '',
  error: false,
};
