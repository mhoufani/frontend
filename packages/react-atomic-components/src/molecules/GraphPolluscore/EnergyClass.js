import React from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import classes from './index.module.scss';

const EnergyClass = ({
  co2Emission,
  color,
  current,
  label,
  width,
}) => (
  <div
    className={cs(classes.energyClass, current && classes.current)}
    style={{
      backgroundColor: color,
      width: current ? 'calc(100vh- 14px)' : width,
    }}
  >
    <span className={classes.label}>{label}</span>
    {current ? (
      <span>
        {co2Emission}g CO
        <sub>2</sub>
        /km
      </span>
    ) : null}
    <div
      className={classes.cone}
      style={{ borderLeft: `10px solid ${color}` }}
    />
  </div>
);

EnergyClass.propTypes = {
  co2Emission: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  current: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default EnergyClass;
