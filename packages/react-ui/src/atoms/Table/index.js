import PropTypes from 'prop-types';
import cs from 'classnames';

import { classNameType } from 'proptypes';

import classes from './index.module.scss';

export const Table = ({ classNames, children }) => (
  <table className={cs(classes.table, classNames.table)}>
    {children}
  </table>
);

Table.defaultProps = {
  classNames: {},
};

Table.propTypes = {
  classNames: PropTypes.shape({
    table: classNameType,
  }),
  children: PropTypes.node,
};
