import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { classNameType } from 'proptypes';
import { RichText, TitleV2 } from 'ui-core/atoms';
import { LEVELS } from 'ui-core/atoms/TitleV2';

import classes from './index.module.scss';

export const HeadingSection = ({
  center,
  classNames,
  description,
  title,
  subTitle,
}) => {
  return (
    <>
      {title && <TitleV2 center={center} {...title} />}
      {subTitle && <TitleV2 center={center} {...subTitle} />}
      {description && (
        <div
          className={cs(
            classes.description,
            center && classes.center,
            classNames.description
          )}
        >
          <RichText center={center} {...description} />
        </div>
      )}
    </>
  );
};

HeadingSection.propTypes = {
  body: PropTypes.string.isRequired,
  classNames: PropTypes.shape({
    description: classNameType,
  }),
  center: PropTypes.bool,
  description: PropTypes.object,
  id: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.shape({
    children: PropTypes.node,
    className: PropTypes.string,
    center: PropTypes.bool,
    element: PropTypes.string,
    level: PropTypes.oneOf(LEVELS),
  }),
  subTitle: PropTypes.shape({
    children: PropTypes.node,
    className: PropTypes.string,
    center: PropTypes.bool,
    element: PropTypes.string,
    level: PropTypes.oneOf(LEVELS),
  }),
};

HeadingSection.defaultProps = {
  classNames: {},
  style: {},
};
