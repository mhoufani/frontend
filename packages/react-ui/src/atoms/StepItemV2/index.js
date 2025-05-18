import PropTypes from 'prop-types';
import cs from 'classnames';
import classes from './index.module.scss';

export const StepItemV2 = ({ state, step, classNames }) => {
  return (
    <>
      <div className={`${classes.index} ${classes[state]}`}>{step.index + 1}</div>
      <li
        className={cs(
          classNames.textElement,
          `${classes.text} ${classes[state]}`
        )}
      >{step.text}</li>
    </>
  );
}

StepItemV2.propTypes = {
  state: PropTypes.string,
  step: PropTypes.shape({
    index: PropTypes.number,
    text: PropTypes.string
  }),
  classNames: PropTypes.shape({
    textElement: PropTypes.string
  })
};

StepItemV2.defaultProps = {
  state: '',
  step: {
    index: 0,
    text: ''
  },
  classNames: {
    element: ''
  }
};


export default StepItemV2;
