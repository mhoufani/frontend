import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import { Title } from 'ui-core/atoms';

import classes from './index.module.scss';

export const TitleWithIcon = ({
  text,
  icon: Icon,
  level,
  classNames,
}) => (
  <div className={cs(classes.container, classNames.container)}>
    <Icon className={cs(classes.icon, classNames.icon)} />
    <Title textPrimary={text} level={level} classNames={classNames} />
  </div>
);

TitleWithIcon.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  level: PropTypes.number.isRequired,
  classNames: PropTypes.shape({
    container: classNameType,
    icon: classNameType,
    titlePrimary: classNameType,
  }),
};

TitleWithIcon.defaultProps = {
  text: '',
  icon: null,
  level: 1,
  classNames: {},
};
