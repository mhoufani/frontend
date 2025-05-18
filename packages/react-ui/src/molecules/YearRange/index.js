import React, { useState, useEffect } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import { Dropdown } from 'ui-core/molecules';

import classes from './index.module.scss';

export const YearRange = ({
  yearRange,
  onChange,
  showOnlyAvailableRange,
  yearMin: _yearMin,
  yearMax: _yearMax,
  yearMinPlaceholder,
  yearMaxPlaceholder,
  yearMinPlaceholderList,
  yearMaxPlaceholderList,
  yearMinLabel,
  yearMaxLabel,
  classNames,
  rangeLimit,
}) => {
  const [range, setRange] = useState(formatRange(yearRange));
  const [yearMax, setYearMax] = useState(_yearMax);
  const [yearMin, setYearMin] = useState(_yearMin);

  useEffect(() => {
    if (Array.isArray(yearRange) && yearRange.length) {
      setRange(formatRange(yearRange));
    }
  }, [yearRange]);

  useEffect(() => {
    rangeLimit &&
      !range.some(year => year === yearMin) &&
      setYearMin(null);
    rangeLimit &&
      !range.some(year => year === yearMax) &&
      setYearMax(null);
  }, [rangeLimit, yearMin, yearMax, range]);

  useEffect(() => {
    (rangeLimit &&
      range.some(year => year === _yearMin) &&
      setYearMin(_yearMin)) ||
      setYearMin(_yearMin);
  }, [rangeLimit, range, _yearMin]);

  useEffect(() => {
    (rangeLimit &&
      range.some(year => year === _yearMax) &&
      setYearMax(_yearMax)) ||
      setYearMax(_yearMax);
  }, [rangeLimit, range, _yearMax]);

  const handleChange = (min, max) => {
    onChange({ yearMin: min, yearMax: max });
  };

  const handleChangeMaxYear = (e, value) => {
    if (yearMin && value && value < yearMin) {
      setYearMin(value);
      setYearMax(value);
      handleChange(value, value);
    } else {
      setYearMax(value);
      handleChange(yearMin, value);
    }
  };

  const handleChangeMinYear = (e, value) => {
    if (yearMax && value && value > yearMax) {
      setYearMax(value);
      setYearMin(value);
      handleChange(value, value);
    } else {
      setYearMin(value);
      handleChange(value, yearMax);
    }
  };

  return (
    <div className={cs(classes.yearRange, classNames.yearRange)}>
      <div className={cs(classes.container)}>
        {!!yearMinLabel && (
          <span className={cs(classes.label, classNames.label)}>
            {yearMinLabel}
          </span>
        )}
        <Dropdown
          value={yearMin}
          placeholder={
            (!!range.length &&
              (!yearMin
                ? range[range.length - 1]
                : yearMinPlaceholder)) ||
            'Min.'
          }
          classNames={{
            ...classNames,
            dropdown: [classes.dropdown, classNames.dropdown],
          }}
        >
          <button
            type="button"
            className={cs(
              classes.dropdownContentItem,
              classes.placeholderList
            )}
            onClick={e => handleChangeMinYear(e, null)}
          >
            {yearMinPlaceholderList}
          </button>
          {!!range.length &&
            range.map(rangeValue =>
              showOnlyAvailableRange &&
              yearMax &&
              yearMax < rangeValue ? null : (
                <button
                  key={rangeValue}
                  type="button"
                  className={cs(
                    classes.dropdownContentItem,
                    rangeValue === yearMin && classes.itemSelected
                  )}
                  onClick={e => handleChangeMinYear(e, rangeValue)}
                >
                  {rangeValue}
                </button>
              )
            )}
        </Dropdown>
      </div>
      <div className={cs(classes.container, classNames.container)}>
        {!!yearMaxLabel && (
          <span className={cs(classes.label, classNames.label)}>
            {yearMaxLabel}
          </span>
        )}
        <Dropdown
          value={yearMax}
          placeholder={
            (!!range.length &&
              (!yearMax ? range[0] : yearMaxPlaceholder)) ||
            'Max.'
          }
          classNames={{
            ...classNames,
            dropdown: [classes.dropdown, classNames.dropdown],
          }}
        >
          <button
            type="button"
            className={cs(
              classes.dropdownContentItem,
              classes.placeholderList
            )}
            onClick={e => handleChangeMaxYear(e, null)}
          >
            {yearMaxPlaceholderList}
          </button>
          {!!range.length &&
            range.map(rangeValue =>
              showOnlyAvailableRange &&
              yearMin &&
              yearMin > rangeValue ? null : (
                <button
                  key={rangeValue}
                  type="button"
                  className={cs(
                    classes.dropdownContentItem,
                    rangeValue === yearMax && classes.itemSelected
                  )}
                  onClick={e => handleChangeMaxYear(e, rangeValue)}
                >
                  {rangeValue}
                </button>
              )
            )}
        </Dropdown>
      </div>
    </div>
  );
};

YearRange.propTypes = {
  yearMinPlaceholder: PropTypes.string,
  yearMaxPlaceholder: PropTypes.string,
  yearMinPlaceholderList: PropTypes.string,
  yearMaxPlaceholderList: PropTypes.string,
  yearRange: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  onChange: PropTypes.func,
  classNames: PropTypes.shape({
    yearRange: classNameType,
    label: classNameType,
    dropdown: classNameType,
    container: classNameType,
  }),
  showOnlyAvailableRange: PropTypes.bool,
  yearMin: PropTypes.number,
  yearMax: PropTypes.number,
  rangeLimit: PropTypes.bool,
  yearMinLabel: PropTypes.string,
  yearMaxLabel: PropTypes.string,
};

YearRange.defaultProps = {
  onChange: () => null,
  classNames: {},
  showOnlyAvailableRange: true,
  yearRange: [],
  yearMinPlaceholder: '',
  yearMaxPlaceholder: '',
  yearMinPlaceholderList: '',
  yearMaxPlaceholderList: '',
  yearMin: null,
  yearMax: null,
  rangeLimit: true,
  yearMinLabel: '',
  yearMaxLabel: '',
};

const formatRange = values =>
  values
    .map(value => parseInt(value, 10))
    .sort((a, b) => Number(b) - Number(a));
