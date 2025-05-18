import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import classes from './index.module.scss';
import { TitleV2 } from 'ui-core/atoms';
import { FormFieldSet } from 'ui-core/molecules';
import { FormConfirmation } from 'ui-core/molecules';

export const FormStep = ({
  step,
  classNames,
  formState,
  formUpdateHandler,
  confirmationStepData,
}) => {
  const { title, parent, formFields, shouldNotWrapFields } = step;

  return (
    <div className={cs(classes.formContainer)}>
      <TitleV2 className={cs(classes.title, classNames.title)}>
        {parent ? parent : title}
      </TitleV2>
      <div className={cs(classes.formContentContainer)}>
        {formFields ? (
          <FormFieldSet
            formState={formState}
            formUpdateHandler={formUpdateHandler}
            formFields={formFields}
            shouldNotWrapFields={shouldNotWrapFields}
          />
        ) : (
          <FormConfirmation {...confirmationStepData} />
        )}
      </div>
    </div>
  );
};

FormStep.propTypes = {
  confirmationStepData: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    link: PropTypes.string,
    buttonText: PropTypes.string,
  }),
  classNames: PropTypes.shape({
    title: classNameType,
    subtitle: classNameType,
  }),
  formState: PropTypes.object,
  formUpdateHandler: PropTypes.func,
  step: PropTypes.shape({
    title: PropTypes.string,
    parent: PropTypes.string,
    shouldNotWrapFields: PropTypes.bool,
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
  }),
};

FormStep.defaultProps = {
  classNames: {},
  step: {},
};
