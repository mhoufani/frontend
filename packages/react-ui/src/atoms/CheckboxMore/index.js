import React, { useEffect, useState } from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import classes from './index.module.scss';

export const minNbShowStep = 5;

export const CheckboxMore = ({
  uniqId,
  onSelect,
  checkboxes: _checkboxes,
  checkboxesActive: _checkboxesActive,
  nbShowStep,
  controlled,
  btnMoreMessage,
  btnLessMessage,
  classNames,
}) => {
  const [checkboxes, setCheckboxes] = useState(
    (_checkboxes || []).reduce(
      (acc, { label, param, amount }) =>
        acc.push({
          amount,
          param,
          active:
            controlled && Array.isArray(_checkboxesActive)
              ? _checkboxesActive.some(a => a === param)
              : false,
          label: label || param,
        }) && acc,
      []
    )
  );

  const [nbShow, setNbShow] = useState(nbShowStep);

  useEffect(() => {
    if (controlled) {
      setCheckboxes(
        (_checkboxes || []).reduce(
          (acc, { label, param, amount }) =>
            acc.push({
              amount,
              param,
              active:
                controlled && Array.isArray(_checkboxesActive)
                  ? _checkboxesActive.some(a => a === param)
                  : false,
              label: label || param,
            }) && acc,
          []
        )
      );
    }
  }, [_checkboxes, controlled, _checkboxesActive]);

  useEffect(() => {
    setNbShow(nbShowStep);
  }, [nbShowStep]);

  const handleShowMore = () => {
    setNbShow(
      nbShow + nbShowStep > checkboxes.length - 1
        ? checkboxes.length
        : nbShow + nbShowStep
    );
  };

  const handleShowLess = () => {
    setNbShow(nbShowStep);
  };

  const handleChange = (targetValue, isActive) => {
    const checkboxNext = [...checkboxes];
    const index = checkboxNext.findIndex(
      ({ param }) => targetValue === param
    );

    if (index > -1) {
      checkboxNext[index].active = isActive;
      setCheckboxes(checkboxNext);
    }
  };

  const isMoreToggle = nbShow < checkboxes.length;

  return (
    <div className={classNames.checkboxMore}>
      {checkboxes
        .slice(0, nbShow)
        .map(({ param, active, label, amount }) => {
          const id = `${uniqId}-${param}`;
          return (
            <label
              htmlFor={id}
              key={param}
              className={cs(
                classes.containerBox,
                classNames.containerBox,
                {
                  [classes.containerBoxChecked]: active,
                  [classes.containerBoxInactive]: amount === 0,
                }
              )}
            >
              <span
                className={cs({ [classes.inactive]: amount === 0 })}
              >
                {label}
              </span>
              {(!!amount || amount === 0) && (
                <span>{`(${amount})`}</span>
              )}
              <input
                id={id}
                name={param}
                defaultChecked={active}
                onChange={() =>
                  controlled
                    ? onSelect(param, !active, amount)
                    : handleChange(param, !active)
                }
                type="checkbox"
                aria-label={label}
              />
              <span
                className={cs(
                  classes.checkboxMark,
                  classNames.checkboxMark,
                  {
                    [classes.checkboxMarkActive]: active,
                    [classes.inactive]: amount === 0,
                  }
                )}
              />
            </label>
          );
        })}
      {checkboxes.length > nbShowStep && (
        <button
          className={classes.moreButton}
          type="button"
          onClick={isMoreToggle ? handleShowMore : handleShowLess}
        >
          {isMoreToggle ? btnMoreMessage : btnLessMessage}
        </button>
      )}
    </div>
  );
};

CheckboxMore.propTypes = {
  uniqId: PropTypes.string,
  checkboxes: PropTypes.arrayOf(
    PropTypes.shape({
      param: PropTypes.string.isRequired,
      label: PropTypes.string,
    })
  ),
  checkboxesActive: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
  controlled: PropTypes.bool,
  nbShowStep: PropTypes.number,
  btnMoreMessage: PropTypes.string,
  btnLessMessage: PropTypes.string,
  classNames: PropTypes.shape({
    checkboxMore: classNameType,
    containerBox: classNameType,
    checkboxMark: classNameType,
  }),
};
CheckboxMore.defaultProps = {
  uniqId: '',
  checkboxes: [],
  controlled: false,
  onSelect: () => null,
  checkboxesActive: [],
  nbShowStep: minNbShowStep,
  btnMoreMessage: '+',
  btnLessMessage: '-',
  classNames: {},
};
