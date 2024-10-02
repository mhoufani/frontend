import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import classes from './index.module.scss';
import { Tabs, Tab } from 'ui-core/molecules';

export const TabsSectionV1 = ({ classNames, tabs }) => {
  return (
    <div className={classes.tabsSection}>
      <Tabs
        classNames={{
          tabs: classes.tabs,
          tabButton: classes.tabButton,
          active: classes.active,
          titleTab: classes.titleTab,
          subTitleTab: classes.subTitleTab,
          icon: classes.icon,
          tabContentTitle: classes.tabContentTitle,
          tabContentTitleMobile: classes.tabContentTitleMobile,
        }}
      >
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            title={tab.title}
            subTitle={tab.subTitle}
            icon={tab.icon}
            tabContentTitle={tab.tabContentTitle}
          >
            <div
              className={cs(
                classes.tabContent,
                classNames.tabContent
              )}
            >
              {tab.content}
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

TabsSectionV1.defaultProps = {
  classNames: {},
};

TabsSectionV1.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subTitle: PropTypes.string,
      icon: PropTypes.node,
      content: PropTypes.node.isRequired,
      tabContentTitle: PropTypes.string,
    })
  ),
  classNames: PropTypes.shape({
    tabContent: classNameType,
  }),
};
