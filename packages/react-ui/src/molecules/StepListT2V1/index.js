import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import classes from './index.module.scss';
import { StepListItemT2V1 } from 'ui-core/atoms';

export const StepListT2V1 = ({
  classNames: { listContainer: classListContainer, ...classNames },
  onStepClick,
  steps,
  visitedSteps,
}) => {
  return (
    <ol className={cs(classes.listContainer, classListContainer)}>
      {steps.map(step => {
        const { title, subSteps } = step;

        const subStepsData = steps.filter(step =>
          subSteps?.includes(step.title)
        );
        // if step has subSteps, it should only appear active if the first subStep is active as well
        const isActive = subSteps?.length
          ? visitedSteps.includes(title) &&
            visitedSteps.includes(subSteps[0].title)
          : visitedSteps.includes(title) ||
            subSteps?.some(subStep =>
              visitedSteps.includes(subStep.title)
            );
        // if step has subSteps, the next step should only appear active if all subSteps are visited as well
        const isNextStepActive = subSteps?.length
          ? subSteps.every(subStep =>
              visitedSteps.includes(subStep.title)
            ) &&
            visitedSteps.includes(
              steps[steps.findIndex(step => step.title === title) + 1]
                .title
            )
          : visitedSteps.includes(
              steps[steps.indexOf(step) + 1]?.title
            );

        return (
          <StepListItemT2V1
            key={title}
            classNames={classNames}
            onClick={() => onStepClick(title)}
            visitedSteps={visitedSteps}
            isActive={isActive}
            isNextStepActive={isNextStepActive}
            step={{ ...step, subStepsData }}
          >
            {!!subSteps?.length && (
              <ul className={cs(classes.subStepList)}>
                {subSteps.map(subStep => {
                  const { title } = subStep;
                  return (
                    <li
                      key={title}
                      className={cs(classes.subStepListItem, {
                        [classes.isActive]:
                          visitedSteps.includes(title),
                      })}
                    >
                      {title}
                    </li>
                  );
                })}
              </ul>
            )}
          </StepListItemT2V1>
        );
      })}
    </ol>
  );
};

StepListT2V1.defaultProps = {
  classNames: {},
  onStepClick: () => {},
  steps: [],
  visitedSteps: [],
};

StepListT2V1.propTypes = {
  visitedSteps: PropTypes.arrayOf(PropTypes.string),
  onStepClick: PropTypes.func,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      subSteps: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          parent: PropTypes.string,
        })
      ),
    })
  ),
  classNames: PropTypes.shape({
    listContent: classNameType,
    listContainer: classNameType,
    listItem: classNameType,
    listItemTitle: classNameType,
  }),
};
