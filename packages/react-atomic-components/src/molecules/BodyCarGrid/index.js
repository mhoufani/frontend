import React, { useState, useEffect } from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import ClassicIcon from 'svgs/picto-classic.svg';
import CommercialIcon from 'svgs/picto-commercial.svg';
import ConvertibleIcon from 'svgs/picto-convertible.svg';
import CoupeIcon from 'svgs/picto-coupe.svg';
import EstateIcon from 'svgs/picto-estate.svg';
import HatchbackIcon from 'svgs/picto-hatchback.svg';
import MPVIcon from 'svgs/picto-mpv.svg';
import SalonIcon from 'svgs/picto-saloon.svg';
import SmallIcon from 'svgs/picto-small.svg';
import SUVIcon from 'svgs/picto-suv.svg';
import classes from './index.module.scss';

const BodyIcons = {
  saloon: <SalonIcon />,
  estate: <EstateIcon />,
  small: <SmallIcon />,
  suv: <SUVIcon />,
  commercial: <CommercialIcon />,
  coupe: <CoupeIcon />,
  mpv: <MPVIcon />,
  convertible: <ConvertibleIcon />,
  hatchback: <HatchbackIcon />,
  classic: <ClassicIcon />,
  other: <SalonIcon />,
};

export const BodyCarGrid = ({
  onSelect,
  bodiesTypeAvailable: _bodiesTypeAvailable,
  bodiesTypeActive: _bodyTypeActive,
  controlled,
  classNames,
  defaultBodies,
}) => {
  const [bodiesTypeAvailable, setBodiesTypeAvailable] = useState(
    _bodiesTypeAvailable || defaultBodies || []
  );

  const [bodiesTypeActive, setBodiesTypeActive] = useState(
    _bodyTypeActive || []
  );

  useEffect(() => {
    setBodiesTypeAvailable(_bodiesTypeAvailable || []);
  }, [_bodiesTypeAvailable]);

  useEffect(() => {
    setBodiesTypeActive(_bodyTypeActive || []);
  }, [_bodyTypeActive]);

  const handleBodyChange = (value, add) => {
    const bodiesType = [...bodiesTypeActive];
    if (add) {
      bodiesType.push(value);
    } else {
      const index = bodiesType.indexOf(value);
      if (index > -1) {
        bodiesType.splice(index, 1);
      }
    }
    setBodiesTypeActive(bodiesType);
  };

  return (
    <ul className={cs(classes.bodyCarGrid, classNames.bodyCarGrid)}>
      {bodiesTypeAvailable.map(({ label, value, amount }, index) => {
        const isActive = bodiesTypeActive.some(b => b === value);
        return (
          <li key={index} className={classNames.bodyCarItemContainer}>
            <button
              className={cs(
                classes.bodyCarItemBtn,
                classNames.bodyCarItemBtn,
                {
                  [classes.bodyCarItemActive]: isActive,
                  [classes.btnInactive]: amount === 0,
                }
              )}
              onClick={() => {
                controlled
                  ? onSelect(value, !isActive, amount)
                  : handleBodyChange(value, !isActive);
              }}
              type="button"
            >
              {BodyIcons[value] || null}
              {label && (
                <span
                  className={cs({
                    [classes.labelInactive]: amount === 0,
                  })}
                >
                  {label}
                </span>
              )}
              {(!!amount || amount === 0) && (
                <span>{`(${amount})`}</span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

BodyCarGrid.propTypes = {
  onSelect: PropTypes.func,
  classNames: PropTypes.shape({
    bodyCarGrid: classNameType,
    bodyCarItemContainer: classNameType,
    bodyCarItemBtn: classNameType,
  }),
  bodiesTypeAvailable: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      amount: PropTypes.number,
    })
  ),
  bodiesTypeActive: PropTypes.arrayOf(PropTypes.string),
  controlled: PropTypes.bool,
  defaultBodies: PropTypes.arrayOf(PropTypes.string),
};

BodyCarGrid.defaultProps = {
  onSelect: () => null,
  classNames: {},
  bodiesTypeActive: null,
  bodiesTypeAvailable: null,
  controlled: false,
  defaultBodies: [
    'saloon',
    'estate',
    'small',
    'suv',
    'commercial',
    'coupe',
    'mpv',
    'convertible',
    'hatchback',
    'classic',
  ],
};
