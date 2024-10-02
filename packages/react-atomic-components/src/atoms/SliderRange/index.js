import React, { memo, useState, useEffect } from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import classes from './index.module.scss';

import { classNameType } from 'proptypes';

export const SliderRange = memo(
  ({
    classNames,
    onChange,
    value,
    min,
    max,
    step,
    fromColors,
    toColors,
    ...sliderProps
  }) => {
    const [sliderVal, setSliderVal] = useState(value);
    const [mouseState, setMouseState] = useState(null);
    const percent = Math.ceil(
      ((sliderVal - min) / (max - min)) * 100
    );
    useEffect(() => {
      setSliderVal(value);
    }, [value]);

    const changeCallback = e => {
      setSliderVal(e.target.value);
    };

    useEffect(() => {
      if (mouseState === 'up') {
        onChange(sliderVal);
      }
    }, [mouseState, onChange, sliderVal]);

    return (
      <div
        className={cs(classes.sliderRange, classNames.sliderRange)}
      >
        <div className={cs(classes.headContainer)}>
          <p>{sliderProps.label}</p>
          <span className={classes.unity}>
            {sliderVal} {sliderProps.unity}
          </span>
        </div>
        <input
          type="range"
          value={sliderVal || ''}
          min={min}
          max={max}
          step={step}
          {...sliderProps}
          id="myRange"
          style={{
            background: `linear-gradient(to right,
                      ${fromColors} 0%,
                      ${fromColors} ${percent}%,
                      ${toColors} ${percent}%,
                      ${toColors} 100%)`,
          }}
          onChange={changeCallback}
          onMouseDown={() => setMouseState('down')}
          onMouseUp={() => setMouseState('up')}
          onTouchStart={() => setMouseState('down')}
          onTouchEnd={() => setMouseState('up')}
        />
      </div>
    );
  }
);

SliderRange.propTypes = {
  onChange: PropTypes.func,
  classNames: PropTypes.shape({
    sliderRange: classNameType,
  }),
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  fromColors: PropTypes.string,
  toColors: PropTypes.string,
};

SliderRange.defaultProps = {
  onChange: () => null,
  classNames: {},
  value: 24,
  min: 0,
  max: 100,
  step: 5,
  fromColors: '#010035',
  toColors: '#dcdcdc',
};

SliderRange.displayName = 'SliderRange';
