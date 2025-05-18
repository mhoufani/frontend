import React from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';
import ChevronRight from 'svgs/chevron-right.svg';
import { classNameType } from 'proptypes';

import classes from './index.module.scss';

export const Pagination = ({
  classNames,
  removeChevronLeft,
  removeChevronRight,
}) => {
  return (
    <ul className={cs(classes.list, classNames.list)}>
      <li
        className={cs(classes.item, classNames.item, {
          [classes.hidden]: removeChevronLeft,
        })}
      >
        <a className={cs(classes.link, classes.hover)} href="#">
          <ChevronRight className={classes.chevronLeft} />
        </a>
      </li>
      <li
        className={cs(classes.item, classNames.item)}
        role="presentation"
      >
        <span className={cs(classes.link, classes.activePage)}>
          1
        </span>
      </li>
      <li className={classes.item} role="presentation">
        <a className={cs(classes.link, classes.hover)} href="#">
          2
        </a>
      </li>
      <li className={classes.item} role="presentation">
        <a className={cs(classes.link, classes.hover)} href="#">
          3
        </a>
      </li>
      <li className={classes.item} role="presentation">
        <a className={cs(classes.link, classes.hover)} href="#">
          4
        </a>
      </li>
      <li className={classes.item} role="presentation">
        <a className={cs(classes.link, classes.hover)} href="#">
          5
        </a>
      </li>
      <li className={classes.item} role="presentation">
        <a className={cs(classes.link, classes.hover)} href="#">
          10
        </a>
      </li>
      <li className={classes.item} role="presentation">
        <a className={cs(classes.link, classes.hover)} href="#">
          20
        </a>
      </li>
      <li className={classes.item} role="presentation">
        <a className={cs(classes.link, classes.hover)} href="#">
          100
        </a>
      </li>
      <li className={classes.item} role="presentation">
        <a className={cs(classes.link, classes.hover)} href="#">
          200
        </a>
      </li>
      <li
        className={cs(classes.item, classNames.item, {
          [classes.hidden]: removeChevronRight,
        })}
      >
        <a className={cs(classes.link, classes.hover)} href="#">
          <ChevronRight className={classes.chevronRight} />
        </a>
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  removeChevronLeft: PropTypes.bool,
  removeChevronRight: PropTypes.bool,
  classNames: PropTypes.shape({
    list: classNameType,
    item: classNameType,
    link: classNameType,
    activePage: classNameType,
    hover: classNameType,
    chevronLeft: classNameType,
  }),
};

Pagination.defaultProps = {
  removeChevronLeft: false,
  removeChevronRight: false,
  classNames: {},
};
