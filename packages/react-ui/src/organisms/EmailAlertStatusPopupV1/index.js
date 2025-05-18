import React from 'react';

import PropTypes from 'prop-types';
import cs from 'classnames';
import classes from './index.module.scss';

import { TitleV2, TextV2, Button } from 'ui-core/atoms';

export const EmailAlertStatusPopupV1 = ({
  pictoStatus,
  classNames,
  titlePopup,
  titlePopupSecondary,
  variant,
  content,
  labelButton,
  onClick,
}) => {
  return (
    <>
      {pictoStatus}
      <TitleV2
        element="h2"
        className={cs(classes.title, classNames.title)}
        secondary={titlePopupSecondary}
      >
        {titlePopup}
      </TitleV2>
      <TextV2
        element="p"
        className={cs(classes.content, classNames.content)}
      >
        {content}
      </TextV2>
      <Button
        variant={variant}
        classNames={{
          button: cs(classes.button, classNames.button),
        }}
        onClick={onClick}
      >
        {labelButton}
      </Button>
    </>
  );
};

EmailAlertStatusPopupV1.propTypes = {
  classNames: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    button: PropTypes.string,
  }),
  pictoStatus: PropTypes.node,
  titlePopup: PropTypes.object,
  titlePopupSecondary: PropTypes.object,
  content: PropTypes.object,
  variant: PropTypes.string,
  labelButton: PropTypes.string,
  onClick: PropTypes.func,
};

EmailAlertStatusPopupV1.defaultProps = {
  classNames: {},
  pictoStatus: null,
  titlePopup: null,
  titlePopupSecondary: null,
  content: null,
  variant: 'primary',
  labelButton: null,
  onClick: () => {},
};
