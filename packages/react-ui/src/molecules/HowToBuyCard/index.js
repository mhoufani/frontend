import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { Button, TextV2 } from 'ui-core/atoms';
import CarHowToBuyModelSVG from 'svgs/car-how-to-buy-model.svg';

import classes from './index.module.scss';

export const HowToBuyCard = ({
  button,
  classNames,
  element: Element,
  isBanner,
  title,
  subTitle,
}) => {
  return (
    <Element
      className={cs(
        classes.howToBuyBanner,
        classNames.howToBuyBanner,
        { [classes.isBanner]: isBanner }
      )}
    >
      <div
        className={cs(
          classes.textContainer,
          classNames.textContainer
        )}
      >
        {title && (
          <TextV2 className={classes.title} weight="bold">
            {title}
          </TextV2>
        )}
        {subTitle && (
          <TextV2 className={classes.subTitle}>{subTitle}</TextV2>
        )}
        {button && (
          <Button
            classNames={{ button: classes.button }}
            variant="primary"
          >
            {button}
          </Button>
        )}
      </div>
      <CarHowToBuyModelSVG
        className={cs(
          classes.carHowToBuyModelSVG,
          classNames.carHowToBuyModelSVG
        )}
        width={220}
        height={95}
      />
      <div
        className={cs(
          classes.roadBackground,
          classNames.roadBackground
        )}
      />
    </Element>
  );
};

HowToBuyCard.defaultProps = {
  button: 'En savoir plus',
  classNames: {},
  element: 'div',
  isBanner: false,
  subTitle:
    'Découvrez toutes les étapes de votre futur parcours avec Reezocar',
  title: "Comment acheter une voiture d'occasion ?",
};

HowToBuyCard.propTypes = {
  button: PropTypes.string,
  classNames: PropTypes.object,
  element: PropTypes.node,
  isBanner: PropTypes.bool,
  subTitle: PropTypes.string,
  title: PropTypes.string,
};
