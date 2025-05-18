import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import { StepItem } from 'ui-core/atoms';

import classes from './index.module.scss';

export const StepListV2 = ({ steps, activeStep, classNames }) => (
  <div
    className={cs(
      classes.stepListContainer,
      classNames.stepListContainer
    )}
  >
    {steps.map(({ stepName, stepDetails }) => (
      <StepItem
        key={stepName}
        isActive={stepName === activeStep.stepName}
        stepName={stepName}
        stepDetails={stepDetails}
        classNames={classNames}
      />
    ))}
  </div>
);

StepListV2.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      stepName: PropTypes.string,
      stepDetails: PropTypes.string,
    })
  ),
  activeStep: PropTypes.shape({
    stepName: PropTypes.string,
    stepDetails: PropTypes.string,
  }),
  classNames: PropTypes.shape({
    stepListContainer: classNameType,
    stepItemContainer: classNameType,
    stepItemStatusContainer: classNameType,
    stepItemCheckIcon: classNameType,
  }),
};

StepListV2.defaultProps = {
  steps: [],
  activeStep: {},
  classNames: {},
};
