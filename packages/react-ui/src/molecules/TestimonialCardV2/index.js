import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import QuoteIcon from 'svgs/quote.svg';
import StarYellow from 'svgs/star-yellow.svg';
import classes from './index.module.scss';
import { TextV2 } from 'ui-core/atoms';
export const TestimonialCardV2 = ({
  message,
  name,
  date,
  classNames,
}) => {
  return (
    <div
      className={cs(
        classes.testimonialCard,
        classNames.testimonialCard
      )}
    >
      <div
        className={cs(classes.iconWrapper, classNames.iconWrapper)}
      >
        <QuoteIcon
          className={cs(classes.quoteIcon, classNames.quoteIcon)}
        />
      </div>
      <div>
        <TextV2
          size={16}
          weight={400}
          style="italic"
          className={cs(classes.message)}
        >
          {message}
        </TextV2>
      </div>
      <div className={cs(classes.bottomCard, classNames.bottomCard)}>
        <div
          className={cs(
            classes.authorDateContainer,
            classNames.authorDateContainer
          )}
        >
          <span className={cs(classes.name, classNames.name)}>
            {name}
          </span>
          <span className={cs(classes.date, classNames.date)}>
            {date}
          </span>
        </div>
        <div className={cs(classes.stars, classNames.stars)}>
          {[...Array(5)].map((_, i) => (
            <StarYellow key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

TestimonialCardV2.propTypes = {
  message: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  classNames: PropTypes.shape({
    testimonialCard: classNameType,
    message: classNameType,
  }),
};

TestimonialCardV2.defaultProps = {
  message: '',
  name: '',
  date: '',
  textEllipseOnly: false,
  showAllContent: false,
  classNames: {},
};
