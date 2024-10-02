import React from 'react';

import PropTypes from 'prop-types';

import cs from 'classnames';
import { classNameType } from 'proptypes';

import classes from './index.module.scss';
import { TitleV2, RichText } from 'ui-core/atoms';

export const InfoBox = ({ classNames, icon: Icon, title, text }) => {
  return (
    <div className={cs(classes.infoBox, classNames.infoBox)}>
      <Icon className={cs(classes.icon, classNames.icon)} />
      <div className={cs(classes.container, classNames.container)}>
        <TitleV2
          className={cs(classes.title, classNames.title)}
          level={5}
        >
          {title}
        </TitleV2>
        <RichText classNames={{ p: classes.content }}>
          {text}
        </RichText>
      </div>
    </div>
  );
};

InfoBox.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  classNames: PropTypes.shape({
    infoBox: classNameType,
    icon: classNameType,
    container: classNameType,
    content: classNameType,
    title: classNameType,
  }),
};

InfoBox.defaultProps = {
  classNames: {},
};
