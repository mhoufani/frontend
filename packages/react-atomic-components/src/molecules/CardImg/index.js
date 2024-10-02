import React from 'react';

import PropTypes from 'prop-types';

import cs from 'classnames';

import classes from './index.module.scss';
import { classNameType } from 'proptypes';

import { Picture, Title } from 'ui-core/atoms';

export const CardImg = ({
  title,
  subTitle,
  img,
  classNames = {},
}) => {
  return (
    <div className={cs(classes.container, classNames.container)}>
      {img}
      <div className={cs(classes.content, classNames.content)}>
        <Title
          className={cs(classes.title, classNames.title)}
          textPrimary={title}
        />
        <Title
          className={cs(classes.subTitle, classNames.subTitle)}
          textPrimary={subTitle}
        />
      </div>
    </div>
  );
};

CardImg.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  img: PropTypes.node.isRequired,
  classNames: PropTypes.shape({
    container: classNameType,
    content: classNameType,
    title: classNameType,
    subTitle: classNameType,
    image: classNameType,
  }),
};

CardImg.defaultProps = {
  classNames: {},
  title: '',
  subTitle: '',
};
