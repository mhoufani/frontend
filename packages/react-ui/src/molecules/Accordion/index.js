import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classes from './index.module.scss';
import cs from 'classnames';
import { Collapsible } from 'ui-core/molecules';

export const Accordion = ({
  items,
  multipleOpening,
  allOpenToggle,
  toggleIcon,
  classNames,
  openAllButtonText,
  closeAllButtonText,
}) => {
  const [openItems, setOpenItems] = useState([]);

  const handleToggle = useCallback(
    index => {
      if (!multipleOpening) {
        setOpenItems(openItems.includes(index) ? [] : [index]);
        return;
      }
      const newState = [...openItems];
      if (!newState.includes(index)) {
        newState.push(index);
        setOpenItems(newState);
      } else {
        newState.splice(newState.indexOf(index), 1);
        setOpenItems(newState);
      }
    },
    [multipleOpening, openItems]
  );

  const handleToggleAll = () => {
    const itemIndexes = items.map((_, index) => index);
    setOpenItems(
      itemIndexes.every(index => !openItems.includes(index))
        ? itemIndexes
        : []
    );
  };

  return (
    <div className={cs(classes.accordions, classNames.accordions)}>
      {allOpenToggle && (
        <button
          onClick={handleToggleAll}
          className={cs(
            classes.accordionToggleAll,
            classNames.accordionToggleAll
          )}
        >
          {openItems.length === 0
            ? openAllButtonText
            : closeAllButtonText}
        </button>
      )}
      {items.map(({ title, content }, index) => (
        <Collapsible
          key={title}
          title={title}
          isActive={openItems.includes(index)}
          onToggle={() => handleToggle(index)}
          toggleIcon={toggleIcon}
          classNames={{
            container: cs(classes.container, classNames.container),
            title: cs(classes.title, classNames.title),
            text: cs(classes.text, classNames.text),
            collapseIcon: cs(
              classes.collapseIcon,
              classNames.collapseIcon
            ),
            titleContainer: cs(
              classes.titleContainer,
              classNames.titleContainer
            ),
          }}
        >
          {content}
        </Collapsible>
      ))}
    </div>
  );
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      content: PropTypes.node,
    })
  ).isRequired,
  classNames: PropTypes.shape({
    accordions: PropTypes.string,
    container: PropTypes.string,
    titleContainer: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    collapseIcon: PropTypes.string,
    accordionToggleAll: PropTypes.string,
  }),
  multipleOpening: PropTypes.bool,
  allOpenToggle: PropTypes.bool,
  toggleIcon: PropTypes.node,
  openAllButtonText: PropTypes.string,
  closeAllButtonText: PropTypes.string,
};

Accordion.defaultProps = {
  multipleOpening: false,
  items: [],
  allOpenToggle: false,
  classNames: {},
  toggleIcon: null,
  openAllButtonText: 'Ouvrir tout',
  closeAllButtonText: 'Fermer tout',
};
