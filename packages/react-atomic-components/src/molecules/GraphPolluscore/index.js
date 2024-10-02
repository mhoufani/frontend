import React from 'react';

import PropTypes from 'prop-types';

import classes from './index.module.scss';

import EnergyClass from './EnergyClass';

export const GraphPolluscore = ({
  co2Emission,
  frenchEmissionClass,
}) => {
  return frenchEmissionClass && co2Emission ? (
    <div className={classes.graph}>
      {itemEnergyClasses.map(({ color, label, width }, key) => (
        <EnergyClass
          key={key}
          co2Emission={co2Emission}
          color={color}
          current={frenchEmissionClass === label}
          label={label}
          width={width}
        />
      ))}
    </div>
  ) : null;
};

GraphPolluscore.propTypes = {
  co2Emission: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  frenchEmissionClass: PropTypes.string.isRequired,
};

const energyClasses = {
  A: { label: 'A', color: '#049748', width: 'calc(40% - 8px)' },
  B: { label: 'B', color: '#4fb049', width: 'calc(50% - 8px)' },
  C: { label: 'C', color: '#c8d32d', width: 'calc(60% - 8px)' },
  D: { label: 'D', color: '#feed06', width: 'calc(70% - 8px)' },
  E: { label: 'E', color: '#f9b816', width: 'calc(80% - 8px)' },
  F: { label: 'F', color: '#ec6724', width: 'calc(90% - 8px)' },
  G: { label: 'G', color: '#e22026', width: 'calc(100% - 8px)' },
};

const itemEnergyClasses = Object.keys(energyClasses).map(
  energyClass => energyClasses[energyClass]
);
