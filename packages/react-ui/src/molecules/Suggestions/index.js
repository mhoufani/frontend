import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import { isEmpty } from 'util-common/checker';
import { Suggestion } from 'ui-core/atoms';

import classes from './index.module.scss';

export const Suggestions = forwardRef(
  (
    {
      classNames,
      highlighted,
      onSelect,
      onSuggestionMouseEnter,
      onSuggestionMouseLeave,
      suggestions,
      suggestionElement: SuggestionElement,
    },
    ref
  ) => {
    return (
      !isEmpty(suggestions) && (
        <div
          className={cs(classes.suggestions, classNames.suggestions)}
          ref={ref}
        >
          {suggestions.map((suggestion, key) => (
            <SuggestionElement
              {...suggestion}
              classNames={{
                isHighlighted: cs(
                  classes.isHighlighted,
                  classNames.isHighlighted
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
              isHighlighted={highlighted === key}
              key={key}
              onClick={() => onSelect(suggestion, key)}
              onMouseEnter={() => onSuggestionMouseEnter(key)}
              onMouseLeave={() => onSuggestionMouseLeave(key)}
            />
          ))}
        </div>
      )
    );
  }
);

Suggestions.defaultProps = {
  classNames: {},
  onSelect: () => null,
  onSuggestionMouseEnter: () => null,
  onSuggestionMouseLeave: () => null,
  suggestionElement: Suggestion,
};

Suggestions.propTypes = {
  classNames: PropTypes.shape({
    isHighlighted: classNameType,
    suggestions: classNameType,
    suggestion: classNameType,
    suggestionInner: classNameType,
  }),
  highlighted: PropTypes.number,
  onSelect: PropTypes.func,
  onSuggestionMouseEnter: PropTypes.func,
  onSuggestionMouseLeave: PropTypes.func,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired,
    })
  ),
  suggestionElement: PropTypes.elementType,
};
