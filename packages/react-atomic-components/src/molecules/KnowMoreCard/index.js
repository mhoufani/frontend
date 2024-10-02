import PropTypes from 'prop-types';

import { Picture, NextBtnLink, Title, Text } from 'ui-core/atoms';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import classes from './index.module.scss';

export const KnowMoreCard = ({
  classNames,
  title,
  text,
  button: { href, label },
  imageSrc,
}) => {
  return (
    <div
      className={cs(classes.pushKnowMore, classNames.pushKnowMore)}
    >
      <div className={classes.container}>
        <Title
          className={cs(classes.title, classNames.title)}
          level={3}
          textPrimary={title}
        />
        <Text
          classNames={{ text: classes.text, ...classNames.text }}
          text={text}
        />
        <NextBtnLink
          link={{ href }}
          classNames={{ buttonLink: classes.buttonLink }}
        >
          {label}
        </NextBtnLink>
      </div>
      <Picture src={imageSrc} alt={title} />
    </div>
  );
};

KnowMoreCard.propTypes = {
  classNames: PropTypes.shape({
    pushKnowMore: classNameType,
    title: classNameType,
    text: classNameType,
  }),
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  button: PropTypes.shape({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  imageSrc: PropTypes.string,
};

KnowMoreCard.defaultProps = {
  classNames: {},
  imageSrc: '/svg/car_card.svg',
};
