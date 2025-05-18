import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import { NextBtnLink } from 'ui-core/atoms';
import { TitleSection } from 'ui-core/molecules';

import classes from './index.module.scss';

export const TextImageBlocV1 = ({
  title,
  subTitle,
  text,
  buttonAncre,
  buttonLink,
  img,
  classNames,
}) => {
  return (
    <div className={cs(classes.container, classNames.container)}>
      <div className={cs(classes.contentPaper)}>
        <TitleSection
          title={title}
          subTitle={subTitle}
          classNames={{ subTitle: classes.titleDesc }}
        />
        <div className={cs(classes.imgContainer)}>{img}</div>
        <p
          className={cs(classes.desc)}
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <div className={classes.buttonLinkWrapper}>
          <NextBtnLink
            classNames={{ buttonLink: classes.buttonLink }}
            link={{ href: buttonLink }}
          >
            {buttonAncre}
          </NextBtnLink>
        </div>
      </div>
    </div>
  );
};

TextImageBlocV1.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  text: PropTypes.string,
  buttonAncre: PropTypes.string,
  buttonLink: PropTypes.string,
  img: PropTypes.node,
  classNames: PropTypes.shape({
    container: classNameType,
    contentPaper: classNameType,
    imgContainer: classNameType,
    desc: classNameType,
    buttonLinkWrapper: classNameType,
  }),
};

TextImageBlocV1.defaultProps = {
  classNames: {},
  title: '',
  subTitle: '',
  text: '',
  buttonAncre: '',
  buttonLink: '',
  img: '',
};
