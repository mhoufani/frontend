import { useCallback, useEffect, useState } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';

import classes from './index.module.scss';
import { TitleV2, TextV2 } from 'ui-core/atoms';
import { Collapsible } from 'ui-core/molecules';

import ArrowIcon from 'svgs/arrow-bottom-bold.svg';

export const ListAccordion = ({
  title: { text, level },
  classNames,
  itemsList,
  secondaryTitle,
  initialOpenItems,
}) => {
  const [totalItems, setTotalItems] = useState(0);
  const [openItems, setOpenItems] = useState(initialOpenItems);
  const handleToggle = useCallback(
    index => {
      const newState = [...openItems];
      if (!newState.includes(index)) {
        newState.push(index);
        setOpenItems(newState);
      } else {
        newState.splice(newState.indexOf(index), 1);
        setOpenItems(newState);
      }
    },
    [openItems]
  );

  useEffect(() => {
    const countTotalItem = itemsList.reduce(
      (acc, item) => acc + item.content.length,
      0
    );
    setTotalItems(countTotalItem);
  }, [itemsList]);

  return (
    <div className={classNames.listAccordion}>
      <TitleV2
        level={level}
        className={cs(classes.title, classNames.title)}
      >
        {text}{' '}
        {secondaryTitle && (
          <span className={classes.secondaryTitle}>
            ({totalItems})
          </span>
        )}
      </TitleV2>
      <div className={cs(classes.accordions, classNames.accordions)}>
        {itemsList.map(({ title, content }, index) => (
          <Collapsible
            key={title}
            title={
              <TextV2
                element="span"
                className={classes.titleCategory}
              >
                {title}{' '}
                <em
                  className={cs(
                    classes.itemCount,
                    classNames.itemCount
                  )}
                >
                  ({content.length})
                </em>
              </TextV2>
            }
            isActive={openItems.includes(index)}
            onToggle={() => handleToggle(index)}
            toggleIcon={ArrowIcon}
            classNames={{
              container: cs(classes.container, classNames.container),
              title: cs(classes.title, classNames.title),
              text: cs(classes.text, classNames.text),
              collapseIcon: cs(classes.collapseIcon),
              titleContainer: cs(classes.titleContainer),
            }}
          >
            {content.map((item, index) => (
              <TextV2
                element="li"
                data-label={item}
                key={index}
                className={cs(classes.listItem, classNames.listItem)}
              >
                {item}
              </TextV2>
            ))}
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

ListAccordion.propTypes = {
  title: PropTypes.shape({
    text: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
  }),
  initialOpenItems: PropTypes.arrayOf(PropTypes.number),
  secondaryTitle: PropTypes.bool,
  classNames: PropTypes.shape({
    title: classNameType,
    itemCount: classNameType,
    listItem: classNameType,
  }),
  itemsList: PropTypes.array.isRequired,
};

ListAccordion.defaultProps = {
  secondaryTitle: false,
  title: {
    text: '',
    level: null,
  },
  initialOpenItems: [],
  classNames: {},
  itemsList: [],
};
