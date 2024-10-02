import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';

import { Title } from 'ui-core/atoms';
import { TitleWithIcon } from 'ui-core/molecules';

import classes from './index.module.scss';

export const PageHeader = ({ text, icon, classNames }) => (
  <div className={cs(classes.container)}>
    {icon ? (
      <TitleWithIcon
        level={1}
        text={text}
        icon={icon}
        classNames={classNames}
      />
    ) : (
      <Title textPrimary={text} level={1} classNames={classNames} />
    )}
  </div>
);

PageHeader.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node,
  classNames: PropTypes.shape({
    container: classNameType,
    icon: classNameType,
    titlePrimary: classNameType,
  }),
};

PageHeader.defaultProps = {
  text: '',
  icon: null,
  classNames: {},
};
