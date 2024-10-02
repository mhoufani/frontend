import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import { Sticker } from 'ui-core/atoms';
import { StepListItem } from 'ui-core/molecules';

import classes from './index.module.scss';

export const StepListT1V3 = ({
  classNames: { listContainer: classListContainer, ...classNames },
  children,
  onStepClick,
  stepItems,
}) => {
  return (
    <ol className={cs(classes.listContainer, classListContainer)}>
      {children}
      {stepItems.map((item, key) => {
        const { title, content, tag, index } = item;

        return (
          <StepListItem
            key={index || key}
            classNames={classNames}
            onClick={() => onStepClick(item, key)}
            tag={tag}
            title={title}
          >
            {content}
          </StepListItem>
        );
      })}
    </ol>
  );
};

StepListT1V3.defaultProps = {
  classNames: {},
  onStepClick: () => {},
  stepItems: [],
};

StepListT1V3.propTypes = {
  classNames: PropTypes.shape({
    listContent: classNameType,
    listContainer: classNameType,
    listItem: classNameType,
    listItemTitle: classNameType,
  }),
  onStepClick: PropTypes.func,
  stepItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.any,
      tag: PropTypes.bool,
    })
  ),
};
