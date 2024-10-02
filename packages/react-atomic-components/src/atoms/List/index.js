import { Children, forwardRef } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';

export const List = forwardRef(
  ({ children, classNames, element: Element }, ref) => {
    if (!Children.count(children)) return null;

    return (
      <Element className={cs(classNames.list)} ref={ref}>
        {children}
      </Element>
    );
  }
);

List.defaultProps = {
  classNames: {},
  element: 'ul',
};

List.propTypes = {
  children: PropTypes.node.isRequired,
  classNames: PropTypes.shape({ list: classNameType }),
  element: PropTypes.oneOf(['ul', 'ol']),
};
