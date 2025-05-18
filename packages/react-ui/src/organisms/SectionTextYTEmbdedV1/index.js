import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import classes from './index.module.scss';
import { YoutubeEmbed } from 'ui-core';
import { SectionBodyV1 } from 'ui-core/organisms';

export const SectionTextYTEmbdedV1 = ({
  after,
  classNames,
  cover,
  left,
  right,
  richTextProps,
  youtubeID,
  ...props
}) => {
  const enmbedProps = {
    classNames: {
      outer: cs(classes.iframeOuter, classNames.iframeOuter, {
        [classes.iframeOuterFloat]: left || right,
        [classes.iframeOuterFloatLeft]: left,
        [classes.iframeOuterFloatRight]: right,
      }),
      iframe: cs(classes.iframe, classNames.iframe),
    },
    cover,
    rounded: true,
    youtubeID,
  };

  return (
    <SectionBodyV1
      {...props}
      classNames={classNames}
      append={
        after && youtubeID ? <YoutubeEmbed {...enmbedProps} /> : null
      }
      prepend={
        !after && youtubeID ? <YoutubeEmbed {...enmbedProps} /> : null
      }
      richTextProps={richTextProps}
    />
  );
};

SectionTextYTEmbdedV1.propTypes = {
  after: PropTypes.bool,
  classNames: PropTypes.object,
  // Todo Use right proptype for cover
  cover: PropTypes.object,
  left: PropTypes.bool,
  right: PropTypes.bool,
  richTextProps: PropTypes.object,
  youtubeID: PropTypes.string.isRequired,
};

SectionTextYTEmbdedV1.defaultProps = {
  after: false,
  classNames: {},
};
