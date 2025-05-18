import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import classes from './index.module.scss';

/**
 * Atom Text
 *
 * ### Usage
 *
 * ```jsx
 * <Text size='normal' type='bold' text='Mon Paragraph de text'/>
 *
 * On définit la size de notre texte via le parametre `size`
 * On peut remplacer normal par big ou small et ainsi définir la taille de notre texte
 *
 * On définit le type de notre texte via le parametre `type`
 * On peut remplacer regular par italic ou bold
 *
 * ```
 *
 */
const textSize = {
  normal: classes.textNormal,
  big: classes.textBig,
  small: classes.textSmall,
};

const textType = {
  regular: classes.textRegular,
  italic: classes.textItalic,
  bold: classes.textBold,
  semibold: classes.textSemiBold,
};

const typographies = {
  none: '',
  h3: classes.textH3,
  subtitle: classes.textSubtitle,
  description: classes.textDescription,
  paragraphLarge: classes.textParagraphLarge,
};

const getSize = size => textSize[size] || textSize.normal;
const getType = type => textType[type] || textType.regular;

export const Text = ({
  classNames,
  size,
  type,
  typographyType,
  text,
}) => {
  const baseClasses = [
    classes.text,
    classNames.text,
    classes.textColor,
    classNames.textColor,
  ];
  const typographyTypeClasses = [
    typographies[typographyType],
    classNames[typographyType],
  ];
  const classesToApply = cs(
    ...baseClasses,
    getSize(size),
    getType(type),
    ...typographyTypeClasses
  );

  return (
    <ReactMarkdown
      className={classesToApply}
      rehypePlugins={[rehypeRaw]}
    >{`${text}`}</ReactMarkdown>
  );
};
Text.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  typographyType: PropTypes.oneOf(Object.keys(typographies)),
  text: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
  classNames: PropTypes.shape({
    text: classNameType,
    textNormal: classNameType,
    textBig: classNameType,
    textSmall: classNameType,
    textRegular: classNameType,
    textItalic: classNameType,
    textBold: classNameType,
    textSemiBold: classNameType,
    textColor: classNameType,
    textSubtitle: classNameType,
    textDescription: classNameType,
  }),
};

Text.defaultProps = {
  size: 'normal',
  type: 'regular',
  typographyType: 'none',
  text: '',
  classNames: { prout: 22455 },
};
