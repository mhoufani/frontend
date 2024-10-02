import React, { useState } from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import { isArray } from 'util-common/checker';
import classes from './index.module.scss';

import { Tab } from 'ui-core/molecules';

// todo: need to be rework without logic children dependencies
export const Tabs = ({
  children,
  classNames,
  elementTabs: ElementTabs,
  elementTab: ElementTab,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const currentTabContentTitle = (
    isArray(children) ? children[activeTabIndex] : children
  )?.props?.tabContentTitle;

  const onClickTabButton = index => setActiveTabIndex(index);

  return (
    <div className={classes.container}>
      <ElementTabs className={cs(classes.tabs, classNames.tabs)}>
        {isArray(children) ? (
          children.map((child, index) => {
            return !!child ? (
              <Tab
                element={ElementTab}
                key={child.props.title}
                title={child.props.title}
                subTitle={child.props.subTitle}
                icon={child.props.icon}
                ref={child.ref}
                tabContentTitle={child.props.tabContentTitle}
                classNames={{
                  active: classNames.active,
                  tabButton: classNames.tabButton,
                  titleTab: classNames.titleTab,
                  subTitleTab: classNames.subTitleTab,
                  icon: classNames.icon,
                  tabContentTitle: classNames.tabContentTitle,
                }}
                onClick={() => onClickTabButton(index)}
                isActive={index === activeTabIndex}
                tabTitleContent={child.props.tabTitleContent}
              />
            ) : null;
          })
        ) : (
          <Tab
            key={children.props.title}
            title={children.props.title}
            subTitle={children.props.subTitle}
            icon={children.props.icon}
            tabContentTitle={children.props.tabContentTitle}
            isActive={activeTabIndex === 0}
            classNames={{
              tabContentTitle: classNames.tabContentTitle,
            }}
          />
        )}
      </ElementTabs>
      <div
        className={cs(
          classNames.tabContentTitle,
          classNames.tabContentTitleMobile
        )}
      >
        {currentTabContentTitle}
      </div>
      <div
        className={cs(classes.tabsContent, classNames.tabsContent)}
      >
        {isArray(children) ? (
          <>
            {children.map((child, index) => {
              if (!!child) {
                if (index !== activeTabIndex) return undefined;
                return child.props.children;
              }
              return null;
            })}
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  elementTabs: PropTypes.node,
  elementTab: PropTypes.node,
  children: PropTypes.instanceOf(Array).isRequired,
  classNames: PropTypes.shape({
    tabs: classNameType,
    tabsContent: classNameType,
    tabTitleContent: classNameType,
    active: classNameType,
    tabButton: classNameType,
    titleTab: classNameType,
    subTitleTab: classNameType,
    icon: classNameType,
  }),
};

Tabs.defaultProps = {
  classNames: {},
  elementTabs: 'ul',
  elementTab: 'li',
};
