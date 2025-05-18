import React, { useState, useEffect } from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import classes from './index.module.scss';

export const PriceRange = ({
  controlled,
  onChange,
  priceMin: _priceMin,
  priceMax: _priceMax,
  priceMinLabelMessage,
  priceMaxLabelMessage,
  priceMinPlaceholder,
  priceMaxPlaceholder,
  classNames,
  priceMinId,
  priceMaxId,
}) => {
  const [priceMax, setPriceMax] = useState(_priceMax || '');
  const [priceMin, setPriceMin] = useState(_priceMin || '');
  const [errorMin, setErrorMin] = useState(
    isMinRangeErr(priceMin, priceMax)
  );
  const [errorMax, setErrorMax] = useState(
    isMaxRangeErr(priceMin, priceMax)
  );

  useEffect(() => {
    if (controlled) {
      const min = _priceMin || '';
      const max = _priceMax || '';

      if (max !== priceMax) {
        const maxRangeErr = isMaxRangeErr(min, max);
        if (errorMax !== maxRangeErr) {
          if (!errorMax && errorMin) setErrorMin(errorMax);
          setErrorMax(!errorMax);
        }
        setPriceMax(max);
      }
      if (min !== priceMin) {
        const minRangeErr = isMinRangeErr(min, max);
        if (errorMin !== minRangeErr) {
          if (!errorMin && errorMax) setErrorMax(errorMin);
          setErrorMin(!errorMin);
        }
        setPriceMin(min);
      }
    }
  }, [
    _priceMax,
    _priceMin,
    controlled,
    errorMax,
    errorMin,
    priceMax,
    priceMin,
  ]);

  const handleChangeMaxPrice = e => {
    const value = e.target.value.replace(/\D/g, '');
    const minRangeErr = isMinRangeErr(priceMin, value);
    const maxRangeErr = isMaxRangeErr(priceMin, value);
    if (controlled) {
      onChange(
        {
          min: !!priceMin ? Number(priceMin) : null,
          max: !!value ? Number(value) : null,
        },
        minRangeErr || maxRangeErr
      );
    } else {
      errorMin !== minRangeErr && setErrorMin(!errorMin);
      errorMax !== maxRangeErr && setErrorMax(!errorMax);
      setPriceMax(value);
    }
  };

  const handleChangeMinPrice = e => {
    const value = e.target.value.replace(/\D/g, '');
    const minRangeErr = isMinRangeErr(value, priceMax);
    const maxRangeErr = isMaxRangeErr(value, priceMax);
    if (controlled) {
      onChange(
        {
          max: !!priceMax ? Number(priceMax) : null,
          min: !!value ? Number(value) : null,
        },
        minRangeErr || maxRangeErr
      );
    } else {
      errorMin !== minRangeErr && setErrorMin(!errorMin);
      errorMax !== maxRangeErr && setErrorMax(!errorMax);
      setPriceMin(value);
    }
  };

  return (
    <div className={cs(classes.priceRange, classNames.priceRange)}>
      <div>
        <label htmlFor={priceMinId}>
          {priceMinLabelMessage}
          <div className={classes.priceWrapper}>
            <input
              id={priceMinId}
              className={cs(
                classes.priceInput,
                classNames.priceInput,
                {
                  [classes.error]: errorMin,
                }
              )}
              aria-label={priceMinLabelMessage}
              value={priceMin}
              placeholder={priceMinPlaceholder}
              type="text"
              name={'price-min'}
              onChange={handleChangeMinPrice}
            />
          </div>
        </label>
      </div>
      <div>
        <label htmlFor={priceMaxId}>
          {priceMaxLabelMessage}
          <div className={classes.priceWrapper}>
            <input
              id={priceMaxId}
              className={cs(
                classes.priceInput,
                classNames.priceInput,
                {
                  [classes.error]: errorMax,
                }
              )}
              aria-label={priceMaxLabelMessage}
              value={priceMax}
              placeholder={priceMaxPlaceholder}
              type="text"
              name={'price-max'}
              onChange={handleChangeMaxPrice}
            />
          </div>
        </label>
      </div>
    </div>
  );
};

PriceRange.propTypes = {
  priceMin: PropTypes.number,
  priceMax: PropTypes.number,
  priceMinLabelMessage: PropTypes.string,
  priceMaxLabelMessage: PropTypes.string,
  priceMinPlaceholder: PropTypes.string,
  priceMaxPlaceholder: PropTypes.string,
  onChange: PropTypes.func,
  controlled: PropTypes.bool,
  classNames: PropTypes.shape({
    priceRange: classNameType,
    priceInput: classNameType,
  }),
  priceMinId: PropTypes.string,
  priceMaxId: PropTypes.string,
};

PriceRange.defaultProps = {
  priceMin: null,
  priceMax: null,
  priceMinLabelMessage: '',
  priceMaxLabelMessage: '',
  priceMinPlaceholder: '',
  priceMaxPlaceholder: '',
  onChange: () => null,
  controlled: false,
  classNames: {},
  priceMinId: 'price-min',
  priceMaxId: 'price-max',
};

const isMinRangeErr = (priceMin, priceMax) =>
  !!priceMax && !!priceMin && Number(priceMin) > Number(priceMax);

const isMaxRangeErr = (priceMin, priceMax) =>
  !!priceMin && !!priceMax && Number(priceMax) < Number(priceMin);
