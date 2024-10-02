import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { Suggestions } from 'ui-core/molecules';

import classes from './index.module.scss';

const DefaultInputElement = props => <input {...props} />;

export const InputSuggestions = forwardRef(
  (
    {
      countSuggestions,
      classNames,
      highlighted,
      inputElement: InputElement,
      isErrored,
      isOpen,
      onSelect,
      onSuggestionMouseEnter,
      onSuggestionMouseLeave,
      suggestions,
      suggestionElement: SuggestionElement,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cs(classes.container, classNames.container, {
          [classes.isErrored]: isErrored,
        })}
        ref={ref}
      >
        <InputElement
          {...props}
          className={cs(classes.input, classNames.input, {
            [cs(classes.inputOpen, classNames.inputOpen)]:
              countSuggestions && isOpen,
          })}
        />
        {isOpen && (
          <Suggestions
            classNames={{
              suggestions: cs(
                classes.suggestions,
                classNames.suggestions
              ),
              suggestion: cs(
                classes.suggestion,
                classNames.suggestion
              ),
              suggestionInner: cs(
                classes.suggestionInner,
                classNames.suggestionInner
              ),
            }}
            highlighted={highlighted}
            onSelect={onSelect}
            onSuggestionMouseEnter={onSuggestionMouseEnter}
            onSuggestionMouseLeave={onSuggestionMouseLeave}
            suggestions={suggestions}
            suggestionElement={SuggestionElement}
          />
        )}
      </div>
    );
  }
);

InputSuggestions.defaultProps = {
  classNames: {},
  countSuggestions: 0,
  inputElement: DefaultInputElement,
  isErrored: false,
  isOpen: false,
};

InputSuggestions.propTypes = {
  countSuggestions: PropTypes.number,
  highlighted: PropTypes.number,
  inputElement: PropTypes.elementType,
  isErrored: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onSuggestionMouseEnter: PropTypes.func,
  onSuggestionMouseLeave: PropTypes.func,
  suggestions: PropTypes.array,
  suggestionElement: PropTypes.elementType,
};
