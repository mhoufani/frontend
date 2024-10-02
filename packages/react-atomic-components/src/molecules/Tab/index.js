import React, { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import { TextV2, Button } from 'ui-core/atoms';
import classes from './index.module.scss';

export const Tab = forwardRef(function Tab(
  {
    classNames,
    element: Element,
    onClick,
    icon: Icon,
    isActive,
    subTitle,
    title,
    tabContentTitle,
  },
  ref
) {
  const onClickTab = useCallback(
    e => {
      e.preventDefault();
      onClick(title);
    },
    [onClick, title]
  );

  return (
    <Element
      ref={ref}
      className={cs(classes.tabListItem, classNames.tabListItem)}
    >
      <Button
        variant="unstyled"
        classNames={{
          button:
            cs(classNames.tabButton, {
              [classNames.active]: isActive,
            }) || null,
        }}
        onClick={onClickTab}
      >
        {Icon && <Icon className={classNames.icon} />}
        {subTitle ? (
          <div className={classes.titleWrapper}>
            <TextV2 className={classNames.titleTab}>{title}</TextV2>
            <TextV2 className={classNames.subTitleTab}>
              {subTitle}
            </TextV2>
          </div>
        ) : (
          <TextV2 className={classNames.titleTab}>{title}</TextV2>
        )}
      </Button>
      {isActive && tabContentTitle && (
        <span
          className={cs(
            classes.tabContentTitle,
            classNames.tabContentTitle
          )}
        >
          {tabContentTitle}
        </span>
      )}
    </Element>
  );
});

Tab.propTypes = {
  element: PropTypes.node,
  title: PropTypes.node.isRequired,
  subTitle: PropTypes.string,
  icon: PropTypes.node,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  tabContentTitle: PropTypes.string,
  classNames: PropTypes.shape({
    icon: classNameType,
    active: classNameType,
    tabIcon: classNameType,
    tabListItem: classNameType,
    tabButton: classNameType,
    titleTab: classNameType,
    subTitleTab: classNameType,
    tabContentTitle: classNameType,
  }),
};

Tab.defaultProps = {
  tabTitleContent: false,
  element: 'li',
  isActive: false,
  title: '',
  level: '',
  subTitle: '',
  icon: null,
  classNames: {},
  onClick: () => {},
};
