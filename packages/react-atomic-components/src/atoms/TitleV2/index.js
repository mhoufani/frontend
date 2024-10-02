import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import { isNumber } from 'util-common/conditional';

import classes from './index.module.scss';

const DEFAULT_LEVEL = 1;
export const LEVELS_NUMBERS = [1, 2, 3, 4, 5, 6];

export const LEVELS = [
  ...LEVELS_NUMBERS,
  ...LEVELS_NUMBERS.map(l => `H${l}`),
];

export const TitleV2 = ({
  center,
  children,
  className,
  classNameSecondary,
  content,
  element: Element,
  level: _level,
  secondary,
  ...props
}) => {
  const level = isNumber(_level)
    ? _level
    : `${_level}`.replace('H', '');
  const levelKey = `titleH${level || DEFAULT_LEVEL}`;
  const TitleComponent = Element || `h${level || DEFAULT_LEVEL}`;
  const classNames = [
    classes.title,
    className,
    classes[levelKey],
    center && classes.center,
  ];

  return (
    <TitleComponent className={cs(...classNames)} {...props}>
      {children || content}
      {secondary && (
        <>
          {' '}
          <span className={cs(classes.secondary, classNameSecondary)}>
            {secondary}
          </span>
        </>
      )}
    </TitleComponent>
  );
};

TitleV2.propTypes = {
  center: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.string,
  className: classNameType,
  classNameSecondary: classNameType,
  element: PropTypes.string,
  level: PropTypes.oneOf(LEVELS).isRequired,
  secondary: PropTypes.node,
};

TitleV2.defaultProps = {
  center: false,
  level: DEFAULT_LEVEL,
  secondary: null,
};

export const TitleSecondaryV2 = ({ className, ...props }) => (
  <span {...props} className={cs(classes.secondary, className)} />
);

TitleSecondaryV2.propTypes = {
  children: PropTypes.node.isRequired,
  className: classNameType,
};
