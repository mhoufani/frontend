import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';

export const Suggestion = ({
  classNames = {},
  isHighlighted,
  label,
  onClick = () => {},
  value,
  ...props
}) => (
  <div
    className={cs(classNames.suggestion, {
      [classNames.isHighlighted]: isHighlighted,
    })}
    onClick={onClick}
    {...props}
  >
    <span className={classNames.suggestionInner}>
      {label || value}
    </span>
  </div>
);

Suggestion.propTypes = {
  classNames: PropTypes.shape({
    isHighlighted: classNameType,
    suggestion: classNameType,
    suggestionInner: classNameType,
  }),
  isHighlighted: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
};
