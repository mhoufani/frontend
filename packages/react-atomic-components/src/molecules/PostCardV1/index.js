import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import { Image } from 'ui-core/atoms';

import Arrow from 'svgs/arrow.svg';

import classes from './index.module.scss';

export const TAG_ORANGE = 'orange';
export const TAG_BLUE = 'blue';
export const TAG_GREEN = 'green';

export const PostCardV1 = ({
  classNames,
  description,
  element: Element,
  cover,
  isRowDirection,
  onPostClick,
  readMore: { element: ReadMoreElement, ...readMoreProps },
  tag,
  title,
}) => {
  const { color: tagColor = TAG_ORANGE } = tag;
  const tagClassName = cs(classes.tag, {
    [classes.tag_orange]: tagColor === TAG_ORANGE,
    [classes.tag_green]: tagColor === TAG_GREEN,
    [classes.tag_blue]: tagColor === TAG_BLUE,
  });

  return (
    <Element
      className={cs(
        classes.card,
        { [classes.cardRow]: isRowDirection },
        classNames.card
      )}
      onClick={onPostClick}
    >
      <div className={cs(classes.media, classNames.media)}>
        {cover && (
          <Image
            alt={cover.alt}
            className={cs(classes.cover, cover.className)}
            itemProp="image"
            sizes={cover.sizes || '320px'}
            src={cover.src}
            srcOnError={cover.srcOnError}
            srcSet={cover.srcSet}
          />
        )}
        {tag.content && (
          <div
            className={cs(classes.tag, tagClassName, tag.className)}
          >
            {tag.content}
          </div>
        )}
      </div>
      <div className={cs(classes.content, classNames.content)}>
        <div className={cs(classes.title, classNames.title)}>
          {title}
        </div>
        <div
          className={cs(classes.description, classNames.description)}
        >
          {description}
        </div>
        {ReadMoreElement && (
          <div
            className={cs(classes.readMore, readMoreProps.className)}
          >
            <ReadMoreElement {...readMoreProps}>
              {readMoreProps.content}
              <Arrow />
            </ReadMoreElement>
          </div>
        )}
      </div>
    </Element>
  );
};

PostCardV1.defaultProps = {
  classNames: {},
  element: 'article',
  cover: {},
  isRowDirection: false,
  onPostClick: () => {},
  readMore: {},
  tag: {},
};

PostCardV1.propTypes = {
  classNames: PropTypes.shape({
    card: classNameType,
    content: classNameType,
    title: classNameType,
  }),
  description: PropTypes.string,
  element: PropTypes.element,
  cover: PropTypes.shape({
    alt: classNameType.isRequired,
    className: classNameType,
    src: PropTypes.string,
    srcOnError: PropTypes.string,
    srcSet: PropTypes.string,
  }),
  isRowDirection: PropTypes.bool,
  onPostClick: PropTypes.func,
  readMore: PropTypes.shape({
    href: PropTypes.string,
    element: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
  tag: PropTypes.shape({
    className: classNameType,
    color: PropTypes.oneOf([TAG_BLUE, TAG_ORANGE, TAG_GREEN]),
    content: PropTypes.string,
  }),
  title: PropTypes.node.isRequired,
};
