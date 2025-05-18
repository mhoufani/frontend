import React, { Fragment } from 'react';
import cs from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { classNameType, urlObjectType } from 'proptypes';

import ArrowRightIcon from 'svgs/arrow-right.svg';
import classes from './index.module.scss';

export const BreadCrumb = ({ classNames, crumbs }) => {
  return (
    <div className={cs(classes.crumbs, classNames.container)}>
      {crumbs.map(({ as, href, name, path, dataCy }, key) => (
        <Fragment key={key}>
          {href || path ? (
            <Link as={as} href={href || path} legacyBehavior>
              <a data-cy={dataCy}>{name}</a>
            </Link>
          ) : (
            <em data-cy={dataCy}>{name}</em>
          )}
          {key !== crumbs.length - 1 && (
            <ArrowRightIcon className={cs(classes.arrow)} />
          )}
        </Fragment>
      ))}
    </div>
  );
};

BreadCrumb.propTypes = {
  classNames: PropTypes.shape({
    container: classNameType,
  }),
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      as: urlObjectType,
      href: urlObjectType,
      name: PropTypes.string,
      path: PropTypes.string,
    })
  ),
};

BreadCrumb.defaultProps = {
  crumbs: [],
  classNames: {},
};
