import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import { YoutubeEmbed } from 'ui-core/atoms';
import { Section } from 'ui-core/molecules';

import classes from './index.module.scss';

export const SectionHeroTitleV3 = ({
  classNames,
  title,
  subTitle,
  video,
}) => {
  return (
    <Section
      append={
        video && (
          <YoutubeEmbed
            classNames={{
              outer: cs(
                classes.ytEmbed_outer,
                video.classNames?.outer
              ),
            }}
            cover={video.cover}
            youtubeID={video.youtubeID}
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

SectionHeroTitleV3.defaultProps = {
  classNames: {},
};

SectionHeroTitleV3.propTypes = {
  classNames: PropTypes.shape({
    background: classNameType,
    container: classNameType,
    section: classNameType,
  }),
  title: PropTypes.object,
  subTitle: PropTypes.object,
  video: PropTypes.shape({
    classNames: classNameType,
    cover: PropTypes.object,
    youtubeID: PropTypes.string,
  }),
};
