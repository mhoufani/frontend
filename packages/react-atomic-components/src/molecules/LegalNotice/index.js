import React from 'react';

import PropTypes from 'prop-types';
import cs from 'classnames';

import { classNameType } from 'proptypes';
import classes from './index.module.scss';
import { Text } from '../../atoms';

export const LegalNotice = ({ content, classNames }) => {
  return (
    <div
      className={cs(
        classes.legalNoticeContainer,
        classNames.legalNoticeContainer
      )}
    >
      <Text
        text={content}
        type="italic"
        classNames={{ text: cs(classes.text, classNames.text) }}
      />
    </div>
  );
};

LegalNotice.propTypes = {
  content: PropTypes.string,
  classNames: PropTypes.shape({
    legalNoticeContainer: classNameType,
    text: classNameType,
  }),
};

LegalNotice.defaultProps = {
  content: '',
  classNames: {},
};
