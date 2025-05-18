import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import { isEmpty } from 'util-common/checker';
import { CarouselCard } from 'ui-core/atoms';
import { PostCardV1 } from 'ui-core/molecules';

import classes from './index.module.scss';

export const CarouselPostCardV1 = ({ classNames, posts }) => {
  return (
    <CarouselCard
      classNames={{
        container: classes.carouselCard_container,
        sliderInner: classes.carouselCard_sliderInner,
        fadeOutLeft: classes.carouselCard_fadeOutLeft,
        fadeOutRight: classes.carouselCard_fadeOutRight,
      }}
      fade
      scrollByItem
    >
      {posts.map((post, key) => {
        return (
          <div
            className={cs(
              classes.postCardOuter,
              classNames.postCardOuter
            )}
            key={key}
          >
            <PostCardV1
              classNames={{ card: classes.postCard }}
              {...post}
            />
          </div>
        );
      })}
    </CarouselCard>
  );
};

CarouselPostCardV1.defaultProps = {
  classNames: {},
  posts: [],
};

CarouselPostCardV1.propTypes = {
  classNames: PropTypes.shape({
    container: classNameType,
  }),
  posts: PropTypes.arrayOf(PostCardV1.propTypes),
};
