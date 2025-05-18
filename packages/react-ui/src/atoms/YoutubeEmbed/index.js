import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import { Button, Image } from 'ui-core/atoms';
import PlayRoundedIcon from 'svgs/play-rounded.svg';

import classes from './index.module.scss';

export const RATIO_4_3 = '4/3';

export const YoutubeEmbed = ({
  autoPlay,
  classNames,
  cover,
  lazy,
  ratio43,
  rounded,
  title,
  youtubeID,
  w100,
  ...props
}) => {
  const [play, setPlay] = useState(false);

  const urlParams = [];
  urlParams.push('modestbranding=1');
  urlParams.push(play || autoPlay ? 'autoplay=1' : '');

  return (
    <div
      className={cs(
        classes.outer,
        classNames.outer,
        ratio43 && classes.ratio43,
        rounded && classes.rounded,
        w100 && classes.w100
      )}
    >
      {!play && cover ? (
        <Button
          classNames={{ button: classes.buttonCover }}
          onClick={() => setPlay(true)}
        >
          <Image
            alt="cover"
            className={classes.imageCover}
            {...cover}
          />
          <PlayRoundedIcon className={classes.playButton} />
        </Button>
      ) : null}
      {!lazy || play ? (
        <iframe
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className={cs(classes.iframe, classNames.iframe)}
          frameBorder="0"
          title={title}
          src={`https://www.youtube.com/embed/${youtubeID}?${urlParams.join(
            '&'
          )}`}
          {...props}
        ></iframe>
      ) : null}
    </div>
  );
};

YoutubeEmbed.propTypes = {
  autoPlay: PropTypes.bool,
  classNames: PropTypes.shape({
    outer: classNameType,
    iframe: classNameType,
  }),
  cover: PropTypes.shape(Image.propTypes),
  lazy: PropTypes.bool,
  ratio43: PropTypes.bool,
  rounded: PropTypes.bool,
  title: PropTypes.string,
  youtubeID: PropTypes.string.isRequired,
  w100: PropTypes.bool,
};

YoutubeEmbed.defaultProps = {
  autoPlay: false,
  classNames: {},
  lazy: false,
};
