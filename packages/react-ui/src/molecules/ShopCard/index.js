import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';

import { isEmpty } from 'util-common/checker';
import { Picture } from 'ui-core/atoms';

import classes from './index.module.scss';

export const ShopCard = ({ agency, classNames }) => {
  const { address, name, image, schedules } = agency || {};
  const regularDays = schedules.slice(0, 4);
  const specialDays = schedules.slice(4, 7);

  return (
    <div
      className={cs(classes.contentAgency, classNames.contentAgency)}
    >
      <div
        className={cs(
          classes.imgContainerOuter,
          classNames.imgContainerOuter
        )}
      >
        <Picture
          classNames={{
            img: classes.imgAgency,
          }}
          alt={`${name}-image`}
          src={image}
        />
      </div>
      <div className={classes.addressContainer}>
        <h3>{name} </h3>
        <p className={classes.address}>{address}</p>
        <p className={classes.openHours}>Horaires d’ouverture :</p>
        <ul className={classes.hours}>
          {!isEmpty(regularDays) &&
            regularDays.map(({ day, hours }, index) => (
              <li key={index}>
                <strong>{day} : </strong>
                {hours}
              </li>
            ))}
        </ul>
        <ul className={classes.hours}>
          {!isEmpty(specialDays) &&
            specialDays.map(({ day, hours }, index) => (
              <li key={index}>
                <strong>{day} : </strong>
                {hours}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

ShopCard.propTypes = {
  agency: PropTypes.shape({
    address: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    schedules: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.string,
        hours: PropTypes.string,
      })
    ),
  }),
  classNames: PropTypes.shape({
    contentAgency: classNameType,
    imgContainerOuter: classNameType,
  }),
};

ShopCard.defaultProps = {
  agency: {},
  classNames: {},
};
