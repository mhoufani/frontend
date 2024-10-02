import React from 'react';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import cs from 'classnames';

import classes from './index.module.scss';

export const ScrollX = React.forwardRef(function ScrollX(
  { children, classNames, id },
  ref
) {
  return (
    <div className={cs(classes.outer, classNames.outer)} id={id}>
      <div className={cs(classes.inner, classNames.inner)} ref={ref}>
        {children}
      </div>
    </div>
  );
});

ScrollX.defaultProps = {
  classNames: {},
};

ScrollX.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  classNames: PropTypes.shape({
    inner: classNameType,
    outer: classNameType,
  }),
};
