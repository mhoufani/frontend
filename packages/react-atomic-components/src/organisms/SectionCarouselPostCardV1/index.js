import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import { isEmpty } from 'util-common/checker';
import { Button } from 'ui-core/atoms';
import { PostCardV1, Section } from 'ui-core/molecules';
import { CarouselPostCardV1 } from 'ui-core/organisms';

import classes from './index.module.scss';

export const SectionCarouselPostCardV1 = ({
  classNames,
  button,
  posts,
  section,
  description,
  title,
}) => {
  return (
    <Section {...section} description={description} title={title}>
      <CarouselPostCardV1 classNames={classNames} posts={posts} />
      {button && (
        <Button
          classNames={{ button: classes.button }}
          variant="primary"
          {...button}
        >
          {button.children}
        </Button>
      )}
    </Section>
  );
};

SectionCarouselPostCardV1.defaultProps = {
  classNames: {},
  posts: [],
  section: {},
};

SectionCarouselPostCardV1.propTypes = {
  button: PropTypes.shape({
    children: PropTypes.node,
  }),
  classNames: PropTypes.shape({
    container: classNameType,
  }),
  description: PropTypes.shape({
    children: PropTypes.node,
  }),
  posts: PropTypes.arrayOf(PostCardV1.propTypes),
  section: PropTypes.shape({
    center: PropTypes.bool,
    classNames: PropTypes.object,
    id: PropTypes.string,
  }),
  title: PropTypes.shape({
    center: PropTypes.bool,
    className: classNameType,
    level: PropTypes.number,
    children: PropTypes.node,
  }),
};
