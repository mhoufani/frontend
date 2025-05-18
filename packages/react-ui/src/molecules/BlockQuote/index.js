import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';

import { RichText } from 'ui-core/atoms';

import classes from './index.module.scss';

export const BlockQuote = ({
  children,
  classNames,
  element: Element,
  body,
}) => {
  return (
    <Element className={cs(classes.container, classNames.container)}>
      <div className={cs(classes.inner, classNames.inner)}>
        {body ? (
          <RichText
            classNames={{ p: classes.richText__p }}
          >{`“${body}”`}</RichText>
        ) : (
          children
        )}
      </div>
    </Element>
  );
};

BlockQuote.defaultProps = {
  classNames: {},
  element: 'blockquote',
};

BlockQuote.propTypes = {
  children: PropTypes.node,
  classNames: PropTypes.shape({
    container: classNameType,
    inner: classNameType,
  }),
  element: PropTypes.string,
  body: PropTypes.string,
};
