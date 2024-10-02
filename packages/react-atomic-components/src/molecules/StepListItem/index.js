import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import { Sticker } from 'ui-core/atoms';

import classes from './index.module.scss';

export const StepListItem = ({
  classNames,
  children,
  onClick,
  tag,
  title,
}) => {
  return (
    <li
      className={cs(
        { [classes.tag]: !!tag },
        classes.listItem,
        classNames.listItem
      )}
      onClick={onClick}
    >
      <span
        className={cs(
          classes.listItemTitle,
          classNames.listItemTitle
        )}
      >
        {title}
      </span>
      {tag && <Sticker text={tag} />}
      {children && (
        <div
          className={cs(classes.listContent, classNames.listContent)}
        >
          {children}
        </div>
      )}
    </li>
  );
};

StepListItem.defaultProps = {
  classNames: {},
  onClick: () => {},
};

StepListItem.propTypes = {
  classNames: PropTypes.shape({
    listContent: classNameType,
    listItem: classNameType,
    listItemTitle: classNameType,
  }),
  children: PropTypes.node,
  onClick: PropTypes.func,
  tag: PropTypes.string,
  title: PropTypes.string.isRequired,
};
