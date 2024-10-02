import PropTypes from 'prop-types';
import cs from 'classnames';

import { Title } from 'ui-core/atoms';
import { StepList } from 'ui-core/molecules';

import classes from './index.module.scss';

export const StepListSection = ({ title, list, classNames }) => {
  return (
    <div className={cs(classNames.container)}>
      <Title
        level={3}
        textPrimary={title}
        classNames={{
          titlePrimary: cs(
            classes.titlePrimary,
            classNames.titlePrimary
          ),
        }}
      />
      <div
        className={cs(
          classes.stepListContainer,
          classNames.stepListContainer
        )}
      >
        <StepList
          list={list}
          classNames={{
            listContainer: classes.listContainer,
          }}
        />
      </div>
    </div>
  );
};

StepListSection.propTypes = {
  title: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
  classNames: PropTypes.shape({
    container: PropTypes.string,
    stepListContainer: PropTypes.string,
    titlePrimary: PropTypes.string,
  }),
};

StepListSection.defaultProps = {
  title: '',
  list: [],
  classNames: {},
};

export default StepListSection;
