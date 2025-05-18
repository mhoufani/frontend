import { classNameType } from 'proptypes';
import cs from 'classnames';

import PropTypes from 'prop-types';

import classes from './index.module.scss';

export const Float = ({
  children,
  classNames,
  element: Element,
  left,
  right,
}) => {
  return (
    <Element
      className={cs(classNames.float, {
        [cs(classes.floatLeft, classNames.left)]: left,
        [cs(classes.floatRight, classNames.right)]: right,
      })}
    >
      {children}
    </Element>
  );
};

Float.defaultProps = {
  element: 'div',
};

Float.propTypes = {
  children: PropTypes.node,
  classNames: PropTypes.shape({
    left: classNameType,
    right: classNameType,
  }),
  left: PropTypes.bool,
  right: PropTypes.bool,
};
