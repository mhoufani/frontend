import React from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import classes from './index.module.scss';

export const TopCornerFlag = ({ classNames, content }) => {
  return (
    <div
      className={cs(classes.topCornerFlag, classNames.topCornerFlag)}
    >
      <span
        className={cs(classes.flagContent, classNames.flagContent)}
      >
        {content}
      </span>
    </div>
  );
};

TopCornerFlag.propTypes = {
  classNames: PropTypes.shape({
    topCornerFlag: PropTypes.string,
    flagContent: PropTypes.string,
  }),
  content: PropTypes.node,
};

TopCornerFlag.defaultProps = {
  classNames: {},
  content: '',
};
