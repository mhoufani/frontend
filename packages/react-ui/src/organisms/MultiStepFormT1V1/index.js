import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import Arrow from 'svgs/arrow.svg';
import classes from './index.module.scss';
import { Button } from 'ui-core/atoms';
import { FormStep, StepListT2V1 } from 'ui-core/molecules';

export const MultiStepFormT1V1 = ({
  steps,
  classNames,
  setStepsFromUserInput,
  confirmationStepData,
  optionalSteps,
  formState,
  setFormState,
  enableNextButton,
  onSubmit,
  submitButtonText,
}) => {
  const [visitedSteps, setVisitedSteps] = useState([steps[0].title]);
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const flattenedSteps = steps.flatMap(element =>
    element.subSteps ? [element, ...element.subSteps] : element
  );
  const isFirstStep = visitedSteps.length === 1;
  const isLastStep = visitedSteps.length === flattenedSteps.length;
  const isStepBeforeConfirmation =
    visitedSteps.length === flattenedSteps.length - 1;
  const nextButtonLabel = isStepBeforeConfirmation
    ? submitButtonText
    : 'Question suivante';
  const firstStepName = steps[0].formFields[0].name;

  useEffect(() => {
    const firstStepValue = formState[firstStepName] || '';
    if (currentStep.title === steps[0].title && firstStepValue) {
      setStepsFromUserInput(firstStepValue);
      setFormState({
        [firstStepName]: firstStepValue,
      });
    }
  }, [
    firstStepName,
    currentStep.title,
    steps[0].title,
    setFormState,
    setStepsFromUserInput,
    formState[firstStepName],
  ]);

  useEffect(() => {
    setCurrentStep(flattenedSteps[visitedSteps.length - 1]);
  }, [flattenedSteps, visitedSteps.length]);

  const enableNextStepButton = () => {
    const { title: currentStepTitle } = currentStep;
    if (optionalSteps.includes(currentStepTitle)) {
      return true;
    }
    const { formFields } = currentStep;

    const fieldToValidate = formFields.filter(field =>
      Object.hasOwn(field, 'isValid')
    );

    const hasValidField = fieldToValidate
      .map(field => {
        if (field.isValid) {
          return field.isValid(formState[field.name]);
        }
      })
      .every(item => item);

    const hasFieldFilled = formFields.every(({ name }) => {
      return formState[name];
    });

    return enableNextButton && hasFieldFilled && hasValidField;
  };

  const goNext = e => {
    const nextStep = flattenedSteps.find(
      step => !visitedSteps.includes(step.title) && step
    );

    const newVisitedSteps = [...visitedSteps];
    newVisitedSteps.push(nextStep.title);

    if (nextStep?.subSteps?.length) {
      newVisitedSteps.push(nextStep?.subSteps[0].title);
    }
    setVisitedSteps([...newVisitedSteps]);
    setCurrentStep(flattenedSteps[newVisitedSteps.length - 1]);

    if (isStepBeforeConfirmation) {
      onSubmit(e, formState);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (visitedSteps.length === 1) {
      return setVisitedSteps([steps[0].title]);
    }

    const newVisitedSteps = [...visitedSteps];
    const itemsToRemove = Object.keys(
      flattenedSteps[newVisitedSteps.length - 2]
    ).includes('subSteps')
      ? 2
      : 1;

    newVisitedSteps.splice(
      newVisitedSteps.length - itemsToRemove,
      itemsToRemove
    );

    setVisitedSteps([...newVisitedSteps]);
    setCurrentStep(flattenedSteps[newVisitedSteps.length - 1]);
  };

  const updateFormState = (event, customData) => {
    const { target: { name, value = '' } = {} } = event;
    setFormState(prevFormState => ({
      ...prevFormState,
      ...(name && { [name]: value }),
      ...(customData && customData),
    }));
  };

  const confirmationFormStepData = confirmationStepData?.isSuccess
    ? confirmationStepData
    : {
        ...confirmationStepData,
        buttonAction: () => {
          setVisitedSteps([steps[0].title]);
          setFormState({});
          setCurrentStep(flattenedSteps[0]);
        },
      };

  return (
    <form className={cs(classes.container, classNames.container)}>
      {!isFirstStep && !isLastStep && (
        <Button
          variant="unstyled"
          onClick={goBack}
          classNames={{
            button: cs(classes.button, classes.isMobile),
          }}
        >
          <Arrow
            className={cs(classes.arrowIcon, classes.isPrevious)}
          />
          Retourner à la question précédente
        </Button>
      )}
      <StepListT2V1
        steps={steps}
        visitedSteps={visitedSteps}
        classNames={{ listContainer: cs(classes.listContainer) }}
      />
      <section
        className={cs(classes.subContainer, classNames.subContainer)}
      >
        <FormStep
          step={currentStep}
          formState={formState}
          formUpdateHandler={updateFormState}
          setFormState={setFormState}
          confirmationStepData={confirmationFormStepData}
        />
        {!isLastStep && (
          <div
            className={cs(
              classes.buttonsContainer,
              classNames.buttonsContainer
            )}
          >
            {!isFirstStep && (
              <Button
                variant="primary"
                onClick={goBack}
                classNames={{
                  button: cs(classes.button, classes.isPrevious),
                }}
              >
                <Arrow
                  className={cs(
                    classes.arrowIcon,
                    classes.isPrevious
                  )}
                />
                Question précédente
              </Button>
            )}
            <Button
              variant="primary"
              disabled={!enableNextStepButton()}
              onClick={goNext}
              classNames={{ button: cs(classes.button) }}
            >
              {nextButtonLabel}
              {!isStepBeforeConfirmation && (
                <Arrow className={cs(classes.arrowIcon)} />
              )}
            </Button>
          </div>
        )}
      </section>
    </form>
  );
};

MultiStepFormT1V1.propTypes = {
  formState: PropTypes.object,
  setFormState: PropTypes.func,
  onSubmit: PropTypes.func,
  submitButtonText: PropTypes.string,
  enableNextButton: PropTypes.bool,
  confirmationStepData: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    link: PropTypes.string,
    buttonText: PropTypes.string,
    isSuccess: PropTypes.bool,
  }),
  classNames: PropTypes.shape({
    container: classNameType,
    subContainer: classNameType,
    buttonsContainer: classNameType,
  }),
  setStepsFromUserInput: PropTypes.func,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      formFields: PropTypes.arrayOf(
        PropTypes.shape({
          subtitle: PropTypes.string,
          type: PropTypes.string,
          name: PropTypes.string,
          placeholder: PropTypes.string,
          options: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              id: PropTypes.string,
            })
          ),
        })
      ),
      subSteps: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          parent: PropTypes.string,
        })
      ),
    })
  ),
  optionalSteps: PropTypes.arrayOf(PropTypes.string),
};

MultiStepFormT1V1.defaultProps = {
  classNames: {},
  steps: [],
  visitedSteps: [],
};
