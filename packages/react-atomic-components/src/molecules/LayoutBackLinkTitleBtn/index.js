import React from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

import { classNameType } from 'proptypes';
import ArrowBackIcon from 'svgs/arrow-back-icon.svg';
import classes from './index.module.scss';
import { Button } from 'ui-core/atoms';

export const LayoutBackLinkTitleBtn = ({
  headerTitle,
  AltButton,
  onClose,
  onValidate,
  headerResetBtnActive,
  headerResetBtnLabel,
  onReset,
  children,
  footerValidateBtnLabel,
  footerValidateBtnDisable,
  footerBtnValidateProps,
  classNames,
}) => (
  <div className={cs(classes.layoutFilter, classNames.layoutFilter)}>
    <div
      className={cs(classes.layoutHeader, classNames.layoutHeader)}
    >
      <button
        className={classes.headerBackButton}
        type="button"
        onClick={onClose}
      >
        <ArrowBackIcon />
      </button>
      <span className={classes.headerTitle}>{headerTitle}</span>
      <Transition
        mountOnEnter
        unmountOnExit
        in={headerResetBtnActive}
        timeout={300}
      >
        {state => (
          <button
            type="button"
            className={cs(classes.headerResetButton, classes[state])}
            onClick={onReset}
          >
            {headerResetBtnLabel}
          </button>
        )}
      </Transition>
    </div>
    <div
      className={cs(classes.layoutContent, classNames.layoutContent)}
    >
      {children}
    </div>
    <div
      className={cs(classes.layoutFooter, classNames.layoutFooter)}
    >
      {AltButton}
      <Button
        variant="primary"
        classNames={{
          button: [
            cs(
              classes.footerBtnValidate,
              classNames.footerBtnValidate
            ),
            { [classes.disabled]: footerValidateBtnDisable },
          ],
        }}
        onClick={onValidate}
        {...footerBtnValidateProps}
      >
        {footerValidateBtnLabel}
      </Button>
    </div>
  </div>
);

LayoutBackLinkTitleBtn.propTypes = {
  onClose: PropTypes.func,
  onReset: PropTypes.func,
  onValidate: PropTypes.func,
  AltButton: PropTypes.node,
  headerTitle: PropTypes.string,
  headerResetBtnActive: PropTypes.bool,
  headerResetBtnLabel: PropTypes.string,
  footerValidateBtnLabel: PropTypes.string,
  footerValidateBtnDisable: PropTypes.bool,
  footerBtnValidateProps: PropTypes.object,
  children: PropTypes.node,
  classNames: PropTypes.shape({
    layoutFilter: classNameType,
    layoutHeader: classNameType,
    layoutContent: classNameType,
    footerBtnValidate: classNameType,
    layoutFooter: classNameType,
  }),
};

LayoutBackLinkTitleBtn.defaultProps = {
  onClose: () => null,
  onReset: () => null,
  onValidate: () => null,
  headerTitle: '',
  headerResetBtnActive: true,
  headerResetBtnLabel: '',
  footerValidateBtnLabel: '',
  footerValidateBtnDisable: true,
  footerBtnValidateProps: {},
  children: null,
  classNames: {},
};
