import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import classes from './index.module.scss';

/**
 * Atom Title
 *
 * ### Usage
 *
 * ```jsx
 * <Title level={1} textPrimary='Titre primaire' textSecondary='Text secondaire'/>
 *
 * ```
 * On définit le niveau de notre titre via le parametre `level``
 * On peut remplacer 1 par 2, 3, 4 et ainsi définir si l'on veut un h1, h2, h3 ou h4
 *
 * ```jsx
 * <Title level={2} textPrimary='Titre primaire' textSecondary='Text secondaire'/>
 *
 * ```
 * Nous avons deux entrées pour le Titre, la partie primaire et secondaire.
 * En fonction du theme dans lequel ce composant est implanté, la partie secondaire change de couleur.
 *
 */

const titleTypes = {
  levelH1: classes.titleH1,
  levelH2: classes.titleH2,
  levelH3: classes.titleH3,
  levelH4: classes.titleH4,
  levelH5: classes.titleH5,
};

const getVariant = type => titleTypes[type] || titleTypes.levelH1;
export const Title = ({
  level,
  textPrimary,
  textSecondary,
  classNames,
  variant,
  ...props
}) => {
  const TitleComponent = `h${level}`;

  return (
    <TitleComponent
      className={cs(
        classes.titlePrimary,
        classNames.titlePrimary,
        getVariant(variant)
      )}
      {...props}
    >
      {textPrimary}
      {textSecondary && (
        <span
          className={cs(
            classes.titleSecondary,
            classNames.titleSecondary
          )}
        >
          {' ' + textSecondary}
        </span>
      )}
    </TitleComponent>
  );
};
Title.propTypes = {
  level: PropTypes.number.isRequired,
  textPrimary: PropTypes.node,
  textSecondary: PropTypes.node,
  classNames: PropTypes.shape({
    titlePrimary: classNameType,
    titleSecondary: classNameType,
  }),
  variant: PropTypes.oneOf(Object.keys(titleTypes)),
};

Title.defaultProps = {
  level: null,
  textPrimary: '',
  textSecondary: '',
  classNames: {},
};
