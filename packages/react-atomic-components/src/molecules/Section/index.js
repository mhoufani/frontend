import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import { ContainerV2 } from 'ui-core/atoms';
import { HeadingSection } from 'ui-core/molecules';

import classes from './index.module.scss';

export const Section = ({
  append,
  center,
  children,
  classNames,
  description,
  element: Element,
  id,
  title,
  subTitle,
  withScrollMarginTop,
}) => {
  return (
    <Element
      className={cs(classes.section, classNames.section, {
        [cs(
          classes.withScrollMarginTop,
          classNames.withScrollMarginTop
        )]: withScrollMarginTop,
      })}
      id={id}
    >
      <ContainerV2 classNames={{ container: classNames.container }}>
        <HeadingSection
          center={center}
          description={description}
          title={title}
          subTitle={subTitle}
        />

        {children}
      </ContainerV2>
      {append}
    </Element>
  );
};

Section.propTypes = {
  append: PropTypes.node,
  center: PropTypes.bool,
  children: PropTypes.node,
  classNames: PropTypes.shape({
    container: classNameType,
    section: classNameType,
    withScrollMarginTop: classNameType,
  }),
  description: PropTypes.object,
  element: PropTypes.node,
  id: PropTypes.string,
  title: PropTypes.object,
  subTitle: PropTypes.object,
  withScrollMarginTop: PropTypes.bool,
};

Section.defaultProps = {
  append: null,
  classNames: {},
  element: 'section',
  withScrollMarginTop: true,
};
