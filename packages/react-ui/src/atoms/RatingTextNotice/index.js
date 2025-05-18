import React from 'react';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import { TextV2 } from 'ui-core/atoms';
import { formatNbSpacing } from 'util-common/formatter';

export const RatingTextNotice = ({
  className,
  nbNotice,
  noticeMessage,
  rate,
  total,
  ...props
}) => {
  return (
    <TextV2 className={className} {...props}>
      {`${formatNbSpacing(rate)} / ${formatNbSpacing(total)}`}
      {nbNotice
        ? ` - ${formatNbSpacing(nbNotice)} ${noticeMessage}`
        : ''}
    </TextV2>
  );
};

RatingTextNotice.defaultProps = {
  className: {},
  noticeMessage: 'avis',
  total: 5,
};

RatingTextNotice.propTypes = {
  className: classNameType,
  nbNotice: PropTypes.number,
  noticeMessage: PropTypes.string,
  rate: PropTypes.number.isRequired,
  total: PropTypes.number,
};
