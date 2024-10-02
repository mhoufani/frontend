import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { classNameType } from 'proptypes';
import { BodySection, Section } from 'ui-core/molecules';
import { addClassNameToProps } from 'util-common/props';

import classes from './index.module.scss';

export const SectionBodyV1 = ({
  append,
  body,
  bodyClassNames,
  center,
  classNames,
  column,
  id,
  prepend,
  richTextProps,
  subTitle,
  title,
}) => {
  return (
    <Section
      center={center}
      classNames={{
        section: classNames.section,
        container: classNames.container,
      }}
      id={id}
      subTitle={addClassNameToProps(subTitle, classes.subTitle)}
      title={addClassNameToProps(title, classes.title)}
    >
      <BodySection
        append={append}
        body={body}
        center={center}
        classNames={{
          ...bodyClassNames,
          body: cs(classes.body, classNames.body),
          container: cs(
            classes.bodyContainer,
            classNames.bodyContainer
          ),
          p: cs(classes.p, bodyClassNames.p),
        }}
        column={column}
        prepend={prepend}
        richTextProps={richTextProps}
      />
    </Section>
  );
};

SectionBodyV1.propTypes = {
  append: PropTypes.node,
  body: PropTypes.string.isRequired,
  bodyClassNames: PropTypes.object,
  center: PropTypes.bool,
  classNames: PropTypes.shape({
    body: classNameType,
    bodyContainer: classNameType,
    container: classNameType,
    section: classNameType,
    subTitle: classNameType,
    title: classNameType,
    ytEmbed: classNameType,
  }),
  column: PropTypes.bool,
  id: PropTypes.string,
  prepend: PropTypes.node,
  title: PropTypes.object,
  subTitle: PropTypes.object,
};

SectionBodyV1.defaultProps = {
  classNames: {},
  bodyClassNames: {},
};
