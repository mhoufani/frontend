import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import classes from './index.module.scss';

export const StepListItemT2V1 = ({
  children,
  classNames,
  step,
  onClick,
  isActive,
  isNextStepActive,
}) => {
  const { title } = step;
  return (
    <li
      className={cs(classes.listItem, classNames.listItem, {
        [classes.isActive]: isActive,
        [classes.isAfterActive]: isNextStepActive,
      })}
      onClick={onClick}
    >
      <span
        className={cs(
          classes.listItemTitle,
          classNames.listItemTitle,
          { [classes.isActive]: isActive }
        )}
      >
        {title}
      </span>
      {children}
    </li>
  );
};

StepListItemT2V1.defaultProps = {
  classNames: {},
  onClick: () => {},
  isActive: false,
  isNextActive: false,
};

StepListItemT2V1.propTypes = {
  children: PropTypes.node,
  step: PropTypes.shape({
    title: PropTypes.string,
    subSteps: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        parent: PropTypes.string,
      })
    ),
  }).isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  isNextStepActive: PropTypes.bool,
  classNames: PropTypes.shape({
    listContent: classNameType,
    listItem: classNameType,
    listItemTitle: classNameType,
  }),
};
