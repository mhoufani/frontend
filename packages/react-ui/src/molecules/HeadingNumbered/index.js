import PropTypes from 'prop-types';
import cs from 'classnames';

import { TextV2, TitleV2, RichText } from 'ui-core/atoms';

import classes from './index.module.scss';

export const HeadingNumbered = ({
  classNames,
  description,
  stepNumber,
  title,
}) => (
  <div
    className={cs(
      classes.titleNumberContainer,
      classNames.titleNumberContainer
    )}
  >
    <TextV2
      weight="bold"
      className={cs(classes.stepNumber, classNames.stepNumber)}
    >
      {stepNumber}
    </TextV2>
    <div
      className={cs(
        classes.titleTextContainer,
        classNames.titleTextContainer
      )}
    >
      <TitleV2 level={4} {...title} className={classes.title}>
        {title.content}
      </TitleV2>
      <RichText>{description}</RichText>
    </div>
  </div>
);

HeadingNumbered.propTypes = {
  classNames: PropTypes.shape({
    titleNumberContainer: PropTypes.string,
    number: PropTypes.string,
    titleTextContainer: PropTypes.string,
  }),
  stepNumber: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.shape({
    content: PropTypes.string,
    children: PropTypes.string,
  }).isRequired,
};

HeadingNumbered.defaultProps = {
  classNames: {},
  title: {},
};
