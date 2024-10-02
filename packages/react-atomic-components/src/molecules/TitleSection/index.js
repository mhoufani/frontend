import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import { Title, Text } from 'ui-core/atoms';

import classes from './index.module.scss';

export const TitleSection = ({
  classNames,
  title,
  titleSecondary,
  subTitle,
  levelTitle,
  size,
}) => (
  <div className={cs(classes.titleSection, classNames.titleSection)}>
    <Title
      textPrimary={title}
      textSecondary={titleSecondary}
      level={levelTitle}
      className={cs(classes.title, classNames.title)}
    />
    <Text
      size={size}
      className={cs(classes.text, classNames.text)}
      text={subTitle}
    />
  </div>
);

TitleSection.propTypes = {
  levelTitle: PropTypes.number,
  title: PropTypes.string,
  titleSecondary: PropTypes.string,
  subTitle: PropTypes.object,
  size: PropTypes.string,
  classNames: PropTypes.shape({
    titleSection: classNameType,
    title: classNameType,
    subTitle: classNameType,
  }),
};

TitleSection.defaultProps = {
  levelTitle: null,
  title: '',
  titleSecondary: '',
  subTitle: null,
  classNames: {},
};
