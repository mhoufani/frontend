import { useState, useEffect } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';

import classes from './index.module.scss';
import { List, TitleV2, TextV2, Button } from 'ui-core/atoms';

export const ListWithPrices = ({
  contentSeeMoreButton,
  contentSeeLessButton,
  title: { text, level },
  withItemCount,
  subTitle: { subTitleText, size, weight },
  classNames,
  items,
  priceWeight,
  maxItems,
}) => {
  const [showMore, setShowMore] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const displayItems =
    items && isMobileOrTablet && items.length > maxItems
      ? items.slice(0, showMore ? items.length : maxItems)
      : items;
  useEffect(() => {
    const mediaQueryList = window.matchMedia('(max-width: 1024px)');
    const handleMediaQueryChange = event => {
      setIsMobileOrTablet(event.matches);
    };
    mediaQueryList.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQueryList.removeEventListener(
        'change',
        handleMediaQueryChange
      );
    };
  }, []);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className={classNames.listLabelCount}>
      <TitleV2
        level={level}
        className={cs(classes.title, classNames.title)}
      >
        {text}{' '}
        {withItemCount && (
          <span className={classes.secondaryTitle}>
            ({items.length})
          </span>
        )}
      </TitleV2>

      <TextV2
        weight={weight}
        size={size}
        className={cs(classes.subTitle, classNames.subTitle)}
      >
        {subTitleText}
      </TextV2>

      <List
        classNames={{
          list: classes.list,
        }}
      >
        {displayItems.map((item, i) => (
          <li
            key={i}
            className={cs(classes.item, classNames.item)}
            data-label={item.option}
            data-price={item.price}
          >
            <TextV2 className={classes.label}>{item.option}</TextV2>
            <TextV2 weight={priceWeight} className={classes.price}>
              {item.price} {item.currency}
            </TextV2>
          </li>
        ))}
        {isMobileOrTablet && items.length > maxItems && (
          <Button
            variant="primary"
            onClick={handleShowMore}
            classNames={{
              button: classes.buttonContainer,
            }}
          >
            {!showMore ? contentSeeMoreButton : contentSeeLessButton}
          </Button>
        )}
      </List>
    </div>
  );
};

ListWithPrices.propTypes = {
  contentSeeMoreButton: PropTypes.string,
  contentSeeLessButton: PropTypes.string,
  title: PropTypes.shape({
    text: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
  }),
  withItemCount: PropTypes.bool,
  subTitle: PropTypes.shape({
    subTitleText: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
  }),
  priceWeight: PropTypes.string.isRequired,
  maxItems: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      option: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    })
  ),
  classNames: PropTypes.shape({
    listLabelCount: classNameType,
    title: classNameType,
    subTitle: classNameType,
    item: classNameType,
    mobileOnly: classNameType,
    buttonContainer: classNameType,
  }),
};

ListWithPrices.defaultProps = {
  contentSeeMoreButton: '',
  contentSeeLessButton: '',
  priceWeight: null,
  maxItems: null,
  withItemCount: false,
  subTitle: {
    subTitleText: '',
    size: null,
    weight: null,
  },
  title: {
    text: '',
    level: null,
  },
  items: [],
  classNames: {},
};
