import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { List, IconWithText } from 'ui-core/atoms';

import ElectricIcon from 'svgs/electric-icon.svg';
import HybridIcon from 'svgs/hybrid-icon.svg';
import PetrolIcon from 'svgs/petrol-icon.svg';
import CalendarIcon from 'svgs/calendar-icon.svg';
import MileageIcon from 'svgs/mileage-icon.svg';
import GearBoxIcon from 'svgs/gearbox-icon.svg';

import classes from './index.module.scss';

export const CarResumeIconLabel = ({ classNames, ...props }) => {
  return (
    <List classNames={{ list: cs(classes.list, classNames.list) }}>
      {rules.map(({ getProps, getInfoResume }, index) => {
        const config = getProps(props);
        return (
          config && (
            <IconWithText
              classNames={{
                icon: classNames.icon,
                text: cs(classes.text, classNames.text),
              }}
              key={index}
              {...getInfoResume(config)}
            />
          )
        );
      })}
    </List>
  );
};

CarResumeIconLabel.propTypes = {
  classNames: PropTypes.object,
  energy: PropTypes.shape({
    icon: PropTypes.oneOf([
      'diesel',
      'petrol',
      'hybrid',
      'gpl',
      'other',
      'electric',
    ]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }),
  gearbox: PropTypes.shape({
    icon: PropTypes.oneOf(['gearbox']),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }),
  mileage: PropTypes.shape({
    icon: PropTypes.oneOf(['mileage']),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }),
  year: PropTypes.shape({
    icon: PropTypes.oneOf(['year']),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }),
};

CarResumeIconLabel.defaultProps = {
  classNames: {},
  energy: null,
  gearbox: null,
  mileage: null,
  year: null,
};

const IconsResolver = {
  diesel: PetrolIcon,
  petrol: PetrolIcon,
  electric: ElectricIcon,
  hybrid: HybridIcon,
};

const rules = [
  {
    getProps: props => props.year,
    getInfoResume: year => ({
      Icon: year.icon || CalendarIcon,
      label:
        (typeof year.label === 'function'
          ? year.label()
          : year.label) || 'NC',
    }),
  },
  {
    getProps: props => props.gearbox,
    getInfoResume: gearbox => ({
      Icon: gearbox.icon || GearBoxIcon,
      label:
        (typeof gearbox.label === 'function'
          ? gearbox.label()
          : gearbox.label) || 'NC',
    }),
  },
  {
    getProps: props => props.energy,
    getInfoResume: energy => ({
      Icon: IconsResolver[energy.icon] || PetrolIcon,
      isGreen: energy.icon === 'electric',
      label:
        (typeof energy.label === 'function'
          ? energy.label()
          : energy.label) || 'NC',
    }),
  },
  {
    getProps: props => props.mileage,
    getInfoResume: mileage => ({
      Icon: mileage.icon || MileageIcon,
      label:
        (typeof mileage.label === 'function'
          ? mileage.label()
          : mileage.label) || 'NC',
    }),
  },
];
