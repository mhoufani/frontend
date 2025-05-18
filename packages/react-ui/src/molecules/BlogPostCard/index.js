import Link from 'next/link';
import cs from 'classnames';
import PropTypes from 'prop-types';

import Arrow from 'svgs/arrow.svg';
import classes from './index.module.scss';
import { Picture } from 'ui-core/atoms';

export const BlogPostCard = ({
  brand,
  imagePath,
  title,
  content,
  categoryName,
  url,
}) => {
  return (
    <Link href={url} legacyBehavior>
      <a target="_blank" className={classes.slide}>
        <div className={classes.card}>
          {classes[categoryName?.toLowerCase()] && (
            <div
              className={cs(
                classes.category,
                classes[categoryName?.toLowerCase()]
              )}
            >
              {categoryName}
            </div>
          )}
          <Picture
            classNames={{
              image: classes.imgContainer,
              img: classes.img,
            }}
            alt={`Actualité${
              !!brand && ` ${brand}`
            } - Photo d'illustration ${title}`}
            src={imagePath}
          />
          <div className={classes.content}>
            <h3 className={classes.h3}>{title}</h3>
            <p className={classes.articleContent}>{content}</p>
            <div className={classes.readNext}>
              Lire la suite <Arrow className={classes.arrow} />
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

BlogPostCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  imagePath: PropTypes.string,
  categoryName: PropTypes.string,
  brand: PropTypes.string,
  url: PropTypes.string,
};

BlogPostCard.defaultProps = {
  url: '',
};
