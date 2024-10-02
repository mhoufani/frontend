import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import { Image } from 'ui-core/atoms';
import { Section } from 'ui-core/molecules';

import classes from './index.module.scss';

export const SectionHeroTitleV2 = ({
  background: { className: bgClassName, ...bgProps },
  classNames,
  title,
  subTitle,
}) => {
  return (
    <Section
      append={
        bgProps.src && (
          <Image
            alt="background"
            className={cs(classes.background, bgClassName)}
            {...bgProps}
          />
        )
      }
      classNames={{
        container: cs(classes.container, classNames.container),
        section: cs(classes.section, classNames.section),
      }}
      element="div"
      title={
        title && {
          ...title,
          className: cs(classes.title, title.className),
        }
      }
      subTitle={
        subTitle && {
          ...subTitle,
          className: cs(classes.subTitle, subTitle.className),
        }
      }
    />
  );
};

SectionHeroTitleV2.defaultProps = {
  background: {},
  classNames: {},
};

SectionHeroTitleV2.propTypes = {
  background: PropTypes.object,
  classNames: PropTypes.shape({
    background: classNameType,
    container: classNameType,
    section: classNameType,
  }),
  title: PropTypes.object,
  subTitle: PropTypes.object,
};
