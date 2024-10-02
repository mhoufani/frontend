import React, { useState, useEffect } from 'react';

import cs from 'classnames';

import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import classes from './index.module.scss';

export const ColorGrid = ({
  onSelect,
  colors,
  colorsActive,
  classNames,
  controlled,
}) => {
  const [colorsAvailable, setColorsAvailable] = useState(
    colors || defaultColors
  );
  const [colorsAvailableActive, setColorsAvailableActive] =
    useState(colorsActive);

  useEffect(() => {
    Array.isArray(colors) && setColorsAvailable(colors);
  }, [colors]);

  useEffect(() => {
    Array.isArray(colorsActive) &&
      setColorsAvailableActive(colorsActive);
  }, [colorsActive]);

  const handleColorActive = (colorValue, active) => {
    const _colorsAvailableActive = [...colorsAvailableActive];
    const index = _colorsAvailableActive.findIndex(
      value => colorValue === value
    );
    if (active) {
      _colorsAvailableActive.push(colorValue);
    } else if (index > -1) {
      _colorsAvailableActive.splice(index, 1);
    }
    setColorsAvailableActive(_colorsAvailableActive);
  };

  return (
    <div className={cs(classes.colorGrid, classNames.colorGrid)}>
      <div
        className={cs(
          classes.colorGridContainer,
          classNames.colorGridContainer
        )}
      >
        {colorsAvailable.map(({ value, label, amount }) => {
          const isActive = colorsAvailableActive.some(
            c => c === value
          );
          return (
            <button
              key={value}
              type="button"
              onClick={() => {
                controlled
                  ? onSelect(value, !isActive, amount)
                  : handleColorActive(value, !isActive);
              }}
              className={cs(classes.button, classNames.button)}
            >
              <div
                className={cs(
                  classes.colorItem,
                  classes.colors,
                  classes[value],
                  classNames.colorItem,
                  {
                    [classes.colorItemActive]: isActive,
                    [classes.inactive]: amount === 0,
                  }
                )}
              >
                <div
                  className={cs(classes.innerActive, {
                    [classes.active]: isActive,
                  })}
                />
                <div className={cs(classes.layer)} />
              </div>
              <div
                className={cs(
                  classes.colorItemText,
                  {
                    [classes.colorTextActive]: isActive,
                  },
                  classNames.colorItemText
                )}
              >
                {label && <span>{label}</span>}
                {(!!amount || amount === 0) && (
                  <span
                    className={classes.amount}
                  >{`(${amount})`}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

ColorGrid.propTypes = {
  onSelect: PropTypes.func,
  classNames: PropTypes.shape({
    colorGrid: classNameType,
    colorGridContainer: classNameType,
    colorItem: classNameType,
    colorItemText: classNameType,
    button: classNameType,
  }),
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      amount: PropTypes.number,
    })
  ),
  colorsActive: PropTypes.arrayOf(PropTypes.string),
  controlled: PropTypes.bool,
};

ColorGrid.defaultProps = {
  onSelect: () => null,
  classNames: {},
  colors: undefined,
  colorsActive: [],
  controlled: false,
};

const defaultColors = [
  { value: 'grey' },
  { value: 'white' },
  { value: 'black' },
  { value: 'blue' },
  { value: 'silver' },
  { value: 'red' },
  { value: 'brown' },
  { value: 'green' },
  { value: 'yellow' },
  { value: 'orange' },
  { value: 'burgundy' },
  { value: 'purple' },
  { value: 'beige' },
  { value: 'gold' },
  { value: 'bronze' },
];
