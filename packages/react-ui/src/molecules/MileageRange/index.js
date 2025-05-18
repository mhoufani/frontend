import React, { useState, useEffect } from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import classes from './index.module.scss';

export const MileageRange = ({
  controlled,
  onChange,
  mileageMin: _mileageMin,
  mileageMax: _mileageMax,
  mileageMinLabelMessage,
  mileageMaxLabelMessage,
  mileageMinPlaceholder,
  mileageMaxPlaceholder,
  classNames,
  mileageMinId,
  mileageMaxId,
}) => {
  const [mileageMax, setMileageMax] = useState(_mileageMax || '');
  const [mileageMin, setMileageMin] = useState(_mileageMin || '');
  const [errorMin, setErrorMin] = useState(
    isMinRangeErr(mileageMin, mileageMax)
  );
  const [errorMax, setErrorMax] = useState(
    isMaxRangeErr(mileageMin, mileageMax)
  );

  useEffect(() => {
    if (controlled) {
      const min = _mileageMin || '';
      const max = _mileageMax || '';

      if (max !== mileageMax) {
        const maxRangeErr = isMaxRangeErr(min, max);
        if (errorMax !== maxRangeErr) {
          if (!errorMax && errorMin) setErrorMin(errorMax);
          setErrorMax(!errorMax);
        }
        setMileageMax(max);
      }
      if (min !== mileageMin) {
        const minRangeErr = isMinRangeErr(min, max);
        if (errorMin !== minRangeErr) {
          if (!errorMin && errorMax) setErrorMax(errorMin);
          setErrorMin(!errorMin);
        }
        setMileageMin(min);
      }
    }
  }, [
    _mileageMax,
    _mileageMin,
    controlled,
    errorMax,
    errorMin,
    mileageMax,
    mileageMin,
  ]);

  const handleChangeMileageMax = e => {
    const value = e.target.value.replace(/\D/g, '');
    const minRangeErr = isMinRangeErr(mileageMin, value);
    const maxRangeErr = isMaxRangeErr(mileageMin, value);
    if (controlled) {
      onChange(
        {
          min: !!mileageMin ? Number(mileageMin) : null,
          max: !!value ? Number(value) : null,
        },
        minRangeErr || maxRangeErr
      );
    } else {
      errorMin !== minRangeErr && setErrorMin(!errorMin);
      errorMax !== maxRangeErr && setErrorMax(!errorMax);
      setMileageMax(value);
    }
  };

  const handleChangeMileageMin = e => {
    const value = e.target.value.replace(/\D/g, '');
    const minRangeErr = isMinRangeErr(value, mileageMax);
    const maxRangeErr = isMaxRangeErr(value, mileageMax);
    if (controlled) {
      onChange(
        {
          max: !!mileageMax ? Number(mileageMax) : null,
          min: !!value ? Number(value) : null,
        },
        minRangeErr || maxRangeErr
      );
    } else {
      errorMin !== minRangeErr && setErrorMin(!errorMin);
      errorMax !== maxRangeErr && setErrorMax(!errorMax);
      setMileageMin(value);
    }
  };

  return (
    <div
      className={cs(classes.mileageRange, classNames.mileageRange)}
    >
      <div>
        <label htmlFor={mileageMinId}>
          {mileageMinLabelMessage}
          <div className={classes.mileageWrapper}>
            <input
              id={mileageMinId}
              className={cs(
                classes.mileageInput,
                classNames.mileageInput,
                {
                  [classes.error]: errorMin,
                }
              )}
              aria-label={mileageMinLabelMessage}
              value={mileageMin || ''}
              placeholder={mileageMinPlaceholder}
              type="text"
              onChange={handleChangeMileageMin}
            />
          </div>
        </label>
      </div>
      <div>
        <label htmlFor={mileageMaxId}>
          {mileageMaxLabelMessage}
          <div className={classes.mileageWrapper}>
            <input
              id={mileageMaxId}
              className={cs(
                classes.mileageInput,
                classNames.mileageInput,
                {
                  [classes.error]: errorMax,
                }
              )}
              aria-label={mileageMaxLabelMessage}
              value={mileageMax}
              placeholder={mileageMaxPlaceholder}
              type="text"
              onChange={handleChangeMileageMax}
            />
          </div>
        </label>
      </div>
    </div>
  );
};

MileageRange.propTypes = {
  mileageMin: PropTypes.number,
  mileageMax: PropTypes.number,
  mileageMinLabelMessage: PropTypes.string,
  mileageMaxLabelMessage: PropTypes.string,
  mileageMinPlaceholder: PropTypes.string,
  mileageMaxPlaceholder: PropTypes.string,
  controlled: PropTypes.bool,
  onChange: PropTypes.func,
  classNames: PropTypes.shape({
    mileageRange: classNameType,
    mileageInput: classNameType,
  }),
  mileageMinId: PropTypes.string,
  mileageMaxId: PropTypes.string,
};

MileageRange.defaultProps = {
  mileageMin: null,
  mileageMax: null,
  mileageMinLabelMessage: '',
  mileageMaxLabelMessage: '',
  mileageMinPlaceholder: '',
  mileageMaxPlaceholder: '',
  controlled: false,
  classNames: {},
  onChange: () => null,
  mileageMinId: 'mileageMinId',
  mileageMaxId: 'mileageMaxId',
};

const isMinRangeErr = (min, max) =>
  !!max && !!min && Number(min) > Number(max);

const isMaxRangeErr = (min, max) =>
  !!min && !!max && Number(max) < Number(min);
