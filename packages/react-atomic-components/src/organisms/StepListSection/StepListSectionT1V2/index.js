import PropTypes from 'prop-types';
import cs from 'classnames';

import { Title } from 'ui-core/atoms';
import { StepList } from 'ui-core/molecules';

import classes from './index.module.scss';

export const StepListSectionT1V2 = ({
  title,
  listItems,
  classNames,
}) => {
  return (
    <div className={cs(classes.stepList, classNames.container)}>
      <div
        className={cs(
          classes.stepListContainer,
          classNames.stepListContainer
        )}
      >
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
        <StepList
          list={listItems}
          classNames={{
            listContainer: classes.listContainer,
          }}
        />
      </div>
    </div>
  );
};

StepListSectionT1V2.propTypes = {
  title: PropTypes.string,
  listItems: PropTypes.arrayOf(PropTypes.string),
  classNames: PropTypes.shape({
    container: PropTypes.string,
    stepListContainer: PropTypes.string,
    titlePrimary: PropTypes.string,
    listContainer: PropTypes.string,
  }),
};

StepListSectionT1V2.defaultProps = {
  title: '',
  listItems: [],
  classNames: {},
};
