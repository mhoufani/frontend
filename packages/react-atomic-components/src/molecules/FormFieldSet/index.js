import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import classes from './index.module.scss';

import { FormField } from 'ui-core/molecules';

export const FormFieldSet = ({
  formState,
  formUpdateHandler,
  formFields,
  classNames,
  shouldNotWrapFields,
}) => {
  return (
    <fieldset
      className={cs(classes.fieldset, classNames.fieldset, {
        [classes.noWrap]: shouldNotWrapFields,
      })}
    >
      {formFields?.map(field => {
        if (field) {
          const { name = '' } = field;
          return (
            <FormField
              key={name}
              value={formState[name] || ''}
              onChangeHandler={formUpdateHandler}
              field={field}
              classNames={{ classNames }}
            />
          );
        }
      })}
    </fieldset>
  );
};

FormFieldSet.propTypes = {
  shouldNotWrapFields: PropTypes.bool,
  classNames: PropTypes.shape({
    title: classNameType,
    fieldset: classNameType,
    subtitle: classNameType,
    container: classNameType,
    secondary: classNameType,
    subContainer: classNameType,
    inputContainer: classNameType,
    input: classNameType,
    prefixSelectContainer: classNameType,
    prefixSelect: classNameType,
    prefix: classNameType,
    prefixButton: classNameType,
    textarea: classNameType,
  }),
  formState: PropTypes.object,
  formUpdateHandler: PropTypes.func,
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
};

FormFieldSet.defaultProps = { classNames: {} };
