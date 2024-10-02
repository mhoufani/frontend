import cs from 'classnames';
import PropTypes from 'prop-types';
import classes from './index.module.scss';
import { RadioButton } from 'ui-core/molecules';
import { List } from 'ui-core/atoms';

export const RadioButtonGroup = ({
  name,
  options,
  onChangeHandler,
  selectedOption,
  classNames,
}) => {
  return (
    <List
      classNames={{
        list: cs(classes.container, classNames?.container),
      }}
    >
      {options.map(option => (
        <li key={option.id}>
          <RadioButton
            name={name}
            option={option}
            checked={selectedOption === option.value}
            onChange={onChangeHandler}
          />
        </li>
      ))}
    </List>
  );
};

RadioButtonGroup.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      id: PropTypes.string,
    })
  ),
  onChangeHandler: PropTypes.func,
  selectedOption: PropTypes.string,
  classNames: PropTypes.shape({
    container: PropTypes.string,
  }),
};

RadioButtonGroup.defaultProps = {
  classNames: {},
  onChangeHandler: () => null,
};
