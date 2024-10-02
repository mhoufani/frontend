import React, { useMemo, useState } from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import classes from './index.module.scss';

export const MenuBurger = ({
  classNames,
  controlled,
  onClick,
  active,
  barWidth,
  barHeight,
  transitionDuration,
  ...props
}) => {
  const [change, setChange] = useState(controlled ? active : false);
  const anime = controlled ? active : change;
  const { bar, barTopActive, barMiddleActive, barBottomActive } =
    useStyles({
      anime,
      barWidth,
      barHeight,
      transitionDuration,
    });

  return (
    <button
      type="button"
      className={cs(classes.menuBurger, classNames.menuBurger)}
      onClick={controlled ? onClick : () => setChange(!change)}
      {...props}
    >
      <div
        style={{ ...bar, ...barTopActive }}
        className={cs(classes.bar, classNames.bar)}
      />
      <div
        style={{ ...bar, ...barMiddleActive }}
        className={cs(classes.bar, classNames.bar)}
      />
      <div
        style={{ ...bar, ...barBottomActive }}
        className={cs(classes.bar, classNames.bar)}
      />
    </button>
  );
};

MenuBurger.propTypes = {
  classNames: PropTypes.shape({
    menuBurger: classNameType,
    bar: classNameType,
    barTop: classNameType,
    barMiddle: classNameType,
    barBottom: classNameType,
  }),
  controlled: PropTypes.bool,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  barWidth: PropTypes.number,
  barHeight: PropTypes.number,
  transitionDuration: PropTypes.number,
};

MenuBurger.defaultProps = {
  classNames: {},
  controlled: true,
  onClick: () => null,
  active: false,
  barWidth: 26,
  barHeight: 2,
  transitionDuration: 0.4,
};

const useStyles = ({
  anime,
  barWidth,
  barHeight,
  transitionDuration,
}) =>
  useMemo(() => {
    const margin = (barWidth - 3 * barHeight) / 4;
    const translate =
      (margin + barHeight) * Math.cos((45 * Math.PI) / 180.0);
    return {
      bar: {
        width: barWidth,
        height: barHeight,
        margin: `${margin}px 0`,
        transition: `${transitionDuration}s`,
      },
      barTopActive: anime
        ? {
            transform: `rotate(-45deg) translate(-${translate}px, ${translate}px)`,
          }
        : {},
      barMiddleActive: anime
        ? {
            opacity: 0,
          }
        : {},
      barBottomActive: anime
        ? {
            transform: `rotate(45deg) translate(-${translate}px, -${translate}px)`,
          }
        : {},
    };
  }, [barWidth, barHeight, transitionDuration, anime]);
