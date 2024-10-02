import { PropTypes } from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import classes from './index.module.scss';
import { infoBoxTypes } from '../../constants';

export const SectionContainerRounded = ({
  isNested,
  children,
  classNames,
  hasBoxShadow,
  contentType,
}) => {
  const styles = cs(
    classes.sectionContainerRounded,
    classNames.sectionContainerRounded,
    {
      [classes.hasBoxShadow]:
        hasBoxShadow && contentType === infoBoxTypes.none,
    },
    classes[contentType],
    classNames[contentType]
  );
  return isNested ? (
    <div className={styles}>{children}</div>
  ) : (
    <section className={styles}>{children}</section>
  );
};

SectionContainerRounded.propTypes = {
  isNested: PropTypes.bool,
  hasBoxShadow: PropTypes.bool,
  children: PropTypes.node,
  contentType: PropTypes.oneOf(Object.values(infoBoxTypes)),
  classNames: PropTypes.shape({
    sectionContainerRounded: classNameType,
    ...Object.values(infoBoxTypes).reduce(
      (classes, type) => ({
        ...classes,
        [type]: classNameType,
      }),
      {}
    ),
  }),
};

SectionContainerRounded.defaultProps = {
  isNested: false,
  children: null,
  contentType: infoBoxTypes.none,
  classNames: {},
  hasBoxShadow: true,
};
