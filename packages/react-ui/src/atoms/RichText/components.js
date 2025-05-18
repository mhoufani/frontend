import PropTypes from 'prop-types';
import cs from 'classnames';

import { Float, Image, TextV2, TitleV2 } from 'ui-core/atoms';

import { LEVELS_NUMBERS } from 'ui-core/atoms/TitleV2';
import { toBoolean } from 'util-common/formatter';

import classes from './index.module.scss';

export const defaultCustomAttributes = {
  '*': [],
  figure: ['left', 'right'],
  text: ['center', 'decoration', 'style', 'weight'],

  ...LEVELS_NUMBERS.reduce((headings, level) => {
    return { ...headings, [`h${level}`]: ['center'] };
  }, {}),
};

export default ({ classNames }) => {
  const components = {
    // Texts
    p: makeElement({
      as: TextV2,
      element: 'p',
      className: classNames.p,
    }),
    em: makeElement({
      as: TextV2,
      element: 'em',
      className: cs(classes.p, classNames.p),
      style: 'italic',
    }),
    a: makeElement({
      as: 'a',
      className: cs(classes.a, classNames.a),
      target: '_blank',
    }),
    text: makeElement({
      as: TextV2,
      element: 'p',
      className: cs(classes.p, classNames.text),
    }),
    strong: makeElement({ as: TextV2, weight: 'bold' }),
    u: makeElement({
      as: TextV2,
      element: 'span',
      decoration: 'underline',
    }),
    clear: makeElement({ as: 'span', className: classes.clearBoth }),

    // Headings
    ...makeHeadingComponents(classNames),

    // Image
    img: makeElement({
      as: Image,
      className: cs(classes.img, classNames.img),
    }),
    figure: makeElement({
      as: Float,
      element: 'figure',
      classNames: {
        float: cs(classes.float, classNames.float),
        left: cs(classes.figureLeft, classNames.figureLeft),
        right: cs(classes.figureRight, classNames.figureRight),
      },
    }),

    // List
    ol: makeElement({
      as: 'ol',
      className: cs(classes.list, classNames.list),
    }),
    ul: makeElement({
      as: 'ul',
      className: cs(classes.list, classNames.list),
    }),

    // Tables
    table: makeElement({
      as: 'table',
      className: cs(classes.table, classNames.table),
    }),
  };

  return components;
};

const makeElement =
  ({ as: As, ...staticProps }) =>
  props => <As {...props} {...staticProps} />;

const makeHeadingComponents = classNames =>
  LEVELS_NUMBERS.reduce(
    (levels, level) => ({
      ...levels,
      [`h${level}`]: makeElement({
        as: TitleV2,
        level,
        className: cs(classes[`h${level}`], classNames[`h${level}`]),
      }),
    }),
    {}
  );
