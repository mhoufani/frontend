import React, { useState, useEffect } from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import ChevronLgIcon from 'svgs/chevron-lg-icon.svg';
import { isNull } from 'util-common/checker';
import classes from './index.module.scss';

export const ToggleTitle = ({
  id,
  title,
  activeOnMount,
  active,
  classNames,
  isEditable,
  children,
}) => {
  const [isActive, setIsActive] = useState(
    !isNull(active) ? active : activeOnMount
  );

  useEffect(() => {
    if (!isNull(active)) setIsActive(active);
  }, [active]);

  return (
    <div
      id={id}
      className={cs(classes.toggleTitle, classNames.toggleTitle)}
    >
      <div
        aria-hidden="true"
        className={cs(classes.toggle, classNames.toggle, {
          [classes.toggleDisabled]: !isEditable,
        })}
        onClick={() => {
          isEditable && setIsActive(!isActive);
        }}
      >
        {typeof title === 'function' ? title() : <em>{title}</em>}
        {isEditable && (
          <span className={classNames.toggleArrowContainer}>
            <ChevronLgIcon
              className={cs(
                classes.arrow,
                classNames.arrow,
                {
                  [classes.arrowDown]: isActive,
                },
                { [classNames.arrowDown]: isActive }
              )}
            />
          </span>
        )}
      </div>
      <div
        className={cs(
          classes.toggleContent,
          classNames.toggleContent,
          {
            [classes.toggleContentOpen]: isActive,
            [classes.toggleContentClose]: !isActive,
            [classNames.toggleContentOpen]: isActive,
            [classNames.toggleContentClose]: !isActive,
          }
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const toggleTitleStylesProTypes = {
  toggleTitle: classNameType,
  toggle: classNameType,
  toggleArrowContainer: classNameType,
  toggleContent: classNameType,
  toggleContentOpen: classNameType,
  toggleContentClose: classNameType,
  arrow: classNameType,
  arrowDown: classNameType,
};

ToggleTitle.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  active: PropTypes.bool,
  activeOnMount: PropTypes.bool,
  classNames: PropTypes.shape(toggleTitleStylesProTypes),
  isEditable: PropTypes.bool,
  id: PropTypes.string,
  children: PropTypes.node,
};

ToggleTitle.defaultProps = {
  classNames: {},
  title: '',
  active: null,
  activeOnMount: false,
  isEditable: true,
  id: undefined,
  children: null,
};
