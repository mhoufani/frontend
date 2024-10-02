import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import SuccessIcon from 'svgs/check-double-circle-blue.svg';
import ErrorIcon from 'svgs/cross-double-circle.svg';
import classes from './index.module.scss';
import { Button, NextBtnLink, Text, TitleV2 } from 'ui-core/atoms';

export const FormConfirmation = ({
  isSuccess,
  title,
  content,
  buttonAction,
  link,
  classNames,
  buttonText,
}) => {
  return (
    <div className={cs(classes.container, classNames.container)}>
      {isSuccess ? <SuccessIcon /> : <ErrorIcon />}
      <div className={classes.textContainer}>
        <TitleV2 className={cs(classes.title, classNames.title)}>
          {title}
        </TitleV2>
        <Text text={content} />
      </div>
      {link && (
        <NextBtnLink link={{ href: link }}>{buttonText}</NextBtnLink>
      )}
      {buttonAction && (
        <Button variant="primary" onClick={buttonAction}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

FormConfirmation.propTypes = {
  isSuccess: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  buttonAction: PropTypes.func,
  link: PropTypes.string,
  buttonText: PropTypes.string,
  classNames: PropTypes.shape({
    title: classNameType,
    container: classNameType,
  }),
};

FormConfirmation.defaultProps = {
  classNames: {},
  isSuccess: true,
};
