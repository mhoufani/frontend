import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';

import classes from './index.module.scss';
import { Text } from 'ui-core/atoms';

export const BannerInfo = ({ classNames, text, type }) => (
  <div className={cs(classes.bannerInfo, classNames.bannerInfo)}>
    <Text
      text={text}
      type={type}
      className={{ text: cs(classNames.text, classNames.textColor) }}
    />
  </div>
);

BannerInfo.propTypes = {
  type: PropTypes.oneOf(['regular', 'semibold', 'bold', 'italic']),
  text: PropTypes.string.isRequired,
  classNames: PropTypes.shape({
    text: classNameType,
    textColor: classNameType,
    bannerInfo: classNameType,
  }),
};

BannerInfo.defaultProps = {
  classNames: {},
  type: 'semibold',
};
