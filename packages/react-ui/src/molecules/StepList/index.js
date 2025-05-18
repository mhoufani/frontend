import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.scss';
import cs from 'classnames';

export const StepList = ({ list, classNames }) => {
  const memoizedList = useMemo(() => {
    return list.map((item, index) => (
      <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
    ));
  }, [list]);

  return (
    <div className={classes.content}>
      <ol
        className={cs(
          classes.listContainer,
          classNames.listContainer
        )}
      >
        {memoizedList}
      </ol>
    </div>
  );
};

StepList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
  classNames: PropTypes.shape({
    listContainer: PropTypes.string,
  }),
};

StepList.defaultProps = {
  list: [],
  classNames: {},
};
