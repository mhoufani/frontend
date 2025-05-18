import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import { Image } from 'ui-core/atoms';
import { Section } from 'ui-core/molecules';

import classes from './index.module.scss';

export const SectionHeroTitleV1 = ({
  append,
  background: { className: bgClassName, ...bgProps },
  classNames,
  title,
}) => {
  return (
    <Section
      append={
        <Image
          alt="background"
          className={cs(classes.background, bgClassName)}
          {...bgProps}
        />
      }
      classNames={{
        container: cs(classes.container, classNames.container),
        section: cs(classes.section, classNames.section),
      }}
      element="div"
      title={{
        ...title,
        className: cs(classes.title, title.className),
      }}
    >
      {append}
    </Section>
  );
};

SectionHeroTitleV1.propTypes = {
  append: PropTypes.node,
  background: PropTypes.object,
  classNames: PropTypes.shape({
    background: classNameType,
    container: classNameType,
    section: classNameType,
  }),
  title: PropTypes.object,
};

SectionHeroTitleV1.defaultProps = {
  append: '',
  classNames: {},
};
