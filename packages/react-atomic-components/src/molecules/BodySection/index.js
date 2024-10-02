import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import { RichText } from 'ui-core/atoms';
import { LEVELS } from 'ui-core/atoms/TitleV2';

import classes from './index.module.scss';

export const BodySection = ({
  append,
  body,
  center,
  classNames,
  column,
  customAttributes,
  customComponents,
  prepend,
  richTextProps,
}) => {
  return (
    <div
      className={
        cs(classNames.container, {
          [classes.containerColumn]: column,
          [classes.containerCenter]: center,
        }) || null
      }
    >
      {prepend}
      <div className={classNames.body}>
        <RichText
          classNames={{
            ...LEVELS.reduce(
              (levelClassNames, level) => ({
                ...levelClassNames,
                [`h${level}`]: cs(
                  classes[`h${level}`],
                  classNames[`h${level}`]
                ),
              }),
              {}
            ),
            p: cs(classes.p, classNames.p),
          }}
          {...richTextProps}
        >
          {body}
        </RichText>
      </div>
      {append}
    </div>
  );
};

BodySection.propTypes = {
  append: PropTypes.node,
  body: PropTypes.string.isRequired,
  center: PropTypes.bool,
  classNames: PropTypes.shape({
    body: classNameType,
    container: classNameType,
    ...LEVELS.reduce(
      (levelClassNames, level) => ({
        ...levelClassNames,
        [`h${level}`]: classNameType,
      }),
      {}
    ),
    p: classNameType,
  }),
  column: PropTypes.bool,
  prepend: PropTypes.node,
  richTextProps: PropTypes.shape({
    customAttributes: PropTypes.object,
    customComponents: PropTypes.object,
    disallowedTags: PropTypes.arrayOf(PropTypes.string),
  }),
};

BodySection.defaultProps = {
  append: null,
  center: false,
  classNames: {},
  column: false,
  bodyClassNames: {},
  prepend: null,
  richTextProps: {},
  style: {},
};
