import PropTypes from 'prop-types';
import cs from 'classnames';

import { classNameType } from 'proptypes';
import { PostCardV1, Section } from 'ui-core/molecules';

import classes from './index.module.scss';

export const SectionPostCardsV1 = ({
  classNames,
  onPostClick,
  posts,
  section,
  title,
}) => (
  <Section {...section} title={title}>
    <div className={cs(classes.posts, classNames.posts)}>
      {posts.map((post, key) => (
        <div
          key={key}
          className={cs(
            classes.postCard_outer,
            classNames.postCardOuter
          )}
        >
          <PostCardV1
            {...post}
            classNames={{
              ...post.classNames,
              card: cs(classes.postCard, post.classNames?.card),
            }}
            onPostClick={() => onPostClick && onPostClick(post)}
          />
        </div>
      ))}
    </div>
  </Section>
);

SectionPostCardsV1.defaultProps = {
  classNames: {},
  posts: [],
  section: {},
};

SectionPostCardsV1.propTypes = {
  classNames: PropTypes.shape({
    posts: classNameType,
    postCard: classNameType,
    postCardOuter: classNameType,
  }),
  onPostClick: PropTypes.func,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      element: PropTypes.element,
      cover: PropTypes.shape({
        alt: classNameType.isRequired,
        className: classNameType,
        src: PropTypes.string,
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
        color: PropTypes.oneOf(['blue', 'orange']),
        content: PropTypes.string,
      }),
      title: PropTypes.node,
    })
  ),
  section: PropTypes.shape({
    element: PropTypes.element,
  }),
  title: PropTypes.shape({
    element: PropTypes.element,
    content: PropTypes.string,
    level: PropTypes.number,
  }),
};
