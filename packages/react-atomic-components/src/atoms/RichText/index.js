import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import remarkGfm from 'remark-gfm';

import { classNameType } from 'proptypes';
import { toBoolean } from 'util-common/formatter';
import { Image, TextV2, TitleV2, YoutubeEmbed } from 'ui-core/atoms';
import { LEVELS_NUMBERS } from 'ui-core/atoms/TitleV2';
import { useRemarkSync } from 'hooks';

import {
  customRehypeSanitize,
  remarkDirectives,
} from 'util-common/remark/plugins';

import defaultCustomComponents, {
  defaultCustomAttributes,
} from './components';

import classes from './index.module.scss';

export const RichText = ({
  allowedTags,
  children,
  classNames,
  customAttributes,
  customComponents,
  disallowedTags,
  onError,
}) => {
  const components = {
    ...defaultCustomComponents({ classNames }),
    ...customComponents,
  };
  const customTagNames = Object.keys(components);

  const reactContent = useRemarkSync(children, {
    onError,
    remarkPlugins: [remarkGfm, ...remarkDirectives],
    rehypeReactOptions: { components },
    rehypePlugins: [
      customRehypeSanitize({
        allowedTags,
        disallowedTags,
        customAttributes: {
          ...defaultCustomAttributes,
          ...customAttributes,
        },
        customTagNames,
      }),
    ],
  });

  return reactContent;
};

RichText.defaultProps = {
  allowedTags: null,
  classNames: {},
  customAttributes: {},
  customComponents: {},
  disallowedTags: null,
  onError: error => {
    console.error('RichText.onError', error);
  },
};

RichText.propTypes = {
  allowedTags: PropTypes.array,
  classNames: PropTypes.shape({
    ...LEVELS_NUMBERS.reduce(
      (levels, l) => ({ ...levels, [`h${l}`]: classNameType }),
      {}
    ),
    a: classNameType,
    img: classNameType,
    list: classNameType,
    p: classNameType,
    table: classNameType,
    text: classNameType,
  }),
  children: PropTypes.string.isRequired,
  customAttributes: PropTypes.array,
  customComponents: PropTypes.shape({
    ...LEVELS_NUMBERS.reduce(
      (levels, l) => ({ ...levels, [`h${l}`]: PropTypes.node }),
      {}
    ),
    a: PropTypes.node,
    em: PropTypes.node,
    img: PropTypes.node,
    list: PropTypes.node,
    ol: PropTypes.node,
    ull: PropTypes.node,
    p: PropTypes.node,
    underline: PropTypes.node,
    strong: PropTypes.node,
    table: PropTypes.node,
    text: PropTypes.node,
  }),
  disallowedTags: PropTypes.array,
  onError: PropTypes.func,
};
