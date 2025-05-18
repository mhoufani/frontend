import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';

import classes from './index.module.scss';
import { List, TextV2, IconWithText } from 'ui-core/atoms';

export const IconsList = ({
  classNames,
  items,
  title: { text, weight, size, element },
}) => {
  return (
    <div className={classNames.listIcon}>
      <TextV2
        weight={weight}
        size={size}
        element={element}
        className={cs(classes.title, classNames.title)}
      >
        {text}
      </TextV2>
      <List
        classNames={{
          list: cs(classes.list, classNames.list),
        }}
      >
        {items.map(item => (
          <li
            key={item}
            className={cs(classes.item, classNames.item)}
          >
            <IconWithText
              classNames={{
                iconWithTextContainer: classes.iconWithTextContainer,
                icon: classes.icon,
                text: classes.text,
              }}
              Icon={item.icon}
              label={item.label}
            />
          </li>
        ))}
      </List>
    </div>
  );
};

IconsList.propTypes = {
  title: PropTypes.shape({
    text: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,
    element: PropTypes.string.isRequired,
  }),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
    })
  ),
  classNames: PropTypes.shape({
    listIcon: classNameType,
    item: classNameType,
    icon: classNameType,
    text: classNameType,
    title: classNameType,
    list: classNameType,
  }),
};

IconsList.defaultProps = {
  title: {},
  items: [],
  classNames: {},
};
