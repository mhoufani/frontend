import React from 'react';

import cs from 'classnames';

import classes from './index.module.scss';

// todo: move to component
export const CarouselDot = (index, isActive, active) => (
  <div className={cs(classes.dot, { [classes.dotActive]: isActive })}>
    <button
      type="button"
      aria-label="dot"
      className={cs(classes.dotBtn, {
        [classes.dotBtnActive]: isActive,
      })}
      onClick={active}
    />
  </div>
);
