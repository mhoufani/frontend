import PropTypes from 'prop-types';
import cs from 'classnames';

import { classNameType } from 'proptypes';
import { ScrollX, Table } from 'ui-core/atoms';

import classes from './index.module.scss';

export const TableV1 = ({ classNames, children }) => (
  <ScrollX
    classNames={{
      outer: classNames.scrollX_outer,
      inner: classNames.scrollX_inner,
    }}
  >
    <Table
      classNames={{ table: cs(classes.table, classNames.table) }}
    >
      {children}
    </Table>
  </ScrollX>
);

TableV1.defaultProps = {
  classNames: {},
};

TableV1.propTypes = {
  classNames: PropTypes.shape({
    scrollX_outer: classNameType,
    scrollX_inner: classNameType,
    table: classNameType,
  }),
  children: PropTypes.node,
};
