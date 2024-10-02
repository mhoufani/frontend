import PlusIcon from 'svgs/plus.svg';
import LessIcon from 'svgs/less.svg';
import classes from './index.module.scss';
import PropTypes from 'prop-types';
import cs from 'classnames';

export const TogglePlusMinus = ({ isOpen, classNames }) => {
  return (
    <span
      className={cs(
        classes.toggleIconContainer,
        classNames.toggleIconContainer
      )}
    >
      <LessIcon
        className={cs(classes.lessIcon, classNames.lessIcon, {
          [classes.isOpen]: isOpen,
        })}
      />
      <PlusIcon
        className={cs(classes.plusIcon, classNames.plusIcon, {
          [classes.isOpen]: !isOpen,
        })}
      />
    </span>
  );
};

TogglePlusMinus.propTypes = {
  isOpen: PropTypes.bool,
  classNames: PropTypes.object,
};

TogglePlusMinus.defaultProps = {
  isOpen: false,
  classNames: {},
};
