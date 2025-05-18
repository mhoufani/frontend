import cs from 'classnames';
import PropTypes from 'prop-types';
import CheckIcon from 'svgs/check-green.svg';
import { classNameType } from 'proptypes';

import { Text } from '../Text';

import classes from './index.module.scss';

export const StepItem = ({
  isActive,
  stepName,
  stepDetails,
  classNames,
}) => (
  <div
    className={cs(
      classes.stepItemContainer,
      classNames.stepItemContainer,
      { [classes.active]: isActive }
    )}
  >
    <div
      className={cs(
        classes.stepItemStatusContainer,
        classNames.stepItemStatusContainer,
        { [classes.active]: isActive }
      )}
    >
      {isActive && (
        <CheckIcon className={classes.stepItemCheckIcon} />
      )}
    </div>
    {stepName && (
      <Text
        classNames={{ subtitle: classes.textSubtitle }}
        typographyType="subtitle"
        text={stepName}
      />
    )}
    {stepDetails && (
      <Text
        classNames={{ description: classes.textDescription }}
        typographyType="description"
        text={stepDetails}
      />
    )}
  </div>
);

StepItem.propTypes = {
  isActive: PropTypes.bool,
  stepName: PropTypes.string,
  stepDetails: PropTypes.string,
  classNames: PropTypes.shape({
    stepItemContainer: classNameType,
    stepItemStatusContainer: classNameType,
    stepItemCheckIcon: classNameType,
    active: classNameType,
    textSubtitle: classNameType,
    textDescription: classNameType,
  }),
};

StepItem.defaultProps = {
  isActive: false,
  stepName: '',
  stepDetails: '',
  classNames: {},
};
