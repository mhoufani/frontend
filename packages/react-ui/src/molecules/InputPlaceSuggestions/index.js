import { useEffect, useRef, useState } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import { useGoogleMapsPlaceSuggestions } from 'hooks';

import { InputSuggestions } from 'ui-core/molecules';
import LocationIcon from 'svgs/location.svg';

import classes from './index.module.scss';

export const InputPlaceSuggestions = ({
  inputElement: InputElement,
  onChange: _onChange,
  onSelect: _onSelect,
  value,
  requestOptions,
  suggestionElement: SuggestionElement,
  ...props
}) => {
  const [selected, setSelected] = useState(null);

  const { defaultProps, inputRef } = useGoogleMapsPlaceSuggestions(
    value,
    {
      onChange: _onChange,
      onSelect: _onSelect,
      requestOptions,
    }
  );

  return (
    <InputSuggestions
      {...defaultProps}
      {...props}
      ref={inputRef}
      inputElement={InputElement}
      suggestionElement={SuggestionElement || PlaceSuggestion}
      value={value}
    />
  );
};

InputPlaceSuggestions.defaultProps = {
  onChange: () => {},
  onSelect: () => {},
  requestOptions: {},
};

InputPlaceSuggestions.propTypes = {
  inputElement: PropTypes.elementType,
  onSelect: PropTypes.func,
  requestOptions: PropTypes.shape({
    includedPrimaryTypes: PropTypes.arrayOf(
      PropTypes.oneOf([
        'streetNumber',
        'postalCode',
        'street',
        'region',
        'city',
        'country',
      ])
    ),
    includedRegionCodes: PropTypes.array,
  }),
  suggestionElement: PropTypes.elementType,
  value: PropTypes.string,
};

const PlaceSuggestion = ({
  classNames,
  isHighlighted,
  onClick,
  onMouseEnter,
  onMouseLeave,
  value,
  ...props
}) => {
  return (
    <div
      className={cs(classNames.suggestion, {
        [classNames.isHighlighted]: isHighlighted,
      })}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={classNames.suggestionInner}>
        <LocationIcon className={cs(classes.locationIcon)} />
        {value}
      </div>
    </div>
  );
};

PlaceSuggestion.propTypes = {
  classNames: PropTypes.shape({
    isHighlighted: classNameType,
    suggestion: classNameType,
    suggestionInner: classNameType,
  }),
  isHighlighted: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  value: PropTypes.string.isRequired,
};
