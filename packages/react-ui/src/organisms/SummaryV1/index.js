import { useState } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { Collapsible, StepListT1V3 } from 'ui-core/molecules';

import classes from './index.module.scss';

export const SummaryV1 = ({
  classNames,
  items,
  onItemClick,
  title,
}) => {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className={cs(classes.container, classNames.container)}>
      <Collapsible
        classNames={{
          collapseIcon: classes.collapseIcon,
          title: classes.title,
        }}
        title={title}
        isActive={isActive}
        onToggle={() => setIsActive(!isActive)}
      >
        <StepListT1V3
          classNames={{
            listContainer: classes.stepListT1V3_listContainer,
            listItem: classes.stepListT1V3_listItem,
            listItemTitle: classes.stepListT1V3_listItemTitle,
          }}
          onStepClick={onItemClick}
          stepItems={items.map(({ title }) => ({ title }))}
        />
      </Collapsible>
    </div>
  );
};

SummaryV1.defaultProps = {
  classNames: {},
  items: [],
  onItemClick: () => {},
  title: 'Sommaire',
};

SummaryV1.propTypes = {
  classNames: PropTypes.shape({
    container: PropTypes.string,
    title: PropTypes.string,
  }),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ),
  onItemClick: PropTypes.func,
  title: PropTypes.string,
};
