import React, { memo, useEffect, useState } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import classes from '../index.module.scss';

const SliderRange = memo(
  ({
    classNames,
    onChange,
    value,
    min,
    max,
    step,
    fromColors,
    showLabelValue,
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
          {showLabelValue && (
            <span className={classes.unity}>
              {sliderVal} {sliderProps.unity}
            </span>
          )}
        </div>
        <input
          type="range"
          value={sliderVal}
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

SliderRange.displayName = 'SliderRange';

SliderRange.propTypes = {
  onChange: PropTypes.func,
  classNames: PropTypes.shape({
    sliderRange: classNameType,
  }),
  inputValue: PropTypes.elementType,
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
  fromColors: '#11589A',
  toColors: '#dcdcdc',
};

export default SliderRange;
