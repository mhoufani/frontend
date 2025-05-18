import React, { useState, useEffect, Children } from 'react';
import cs from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';

import classes from './index.module.scss';

export const MoreList = ({
  nbShowStep,
  linkMoreParams,
  linkMoreMessage,
  btnMoreMessage,
  btnLessMessage,
  children,
  classNames,
}) => {
  const [nbShow, setNbShow] = useState(nbShowStep);

  useEffect(() => {
    setNbShow(nbShowStep);
  }, [nbShowStep, children]);

  const handleShowMore = () => {
    const nbItemsHidden = Children.count(children) - nbShow;
    if (nbItemsHidden > nbShow) {
      setNbShow(nbShow + nbShowStep);
    } else if (nbItemsHidden > 0) {
      setNbShow(Children.count(children));
    }
  };

  return (
    <div className={cs(classes.moreList, classNames.moreList)}>
      <ul
        className={cs(
          classes.moreListContainer,
          classNames.moreListContainer
        )}
      >
        {Children.map(children, (child, index) => (
          <li
            key={index}
            className={cs(
              classes.moreListItem,
              classNames.moreListItem,
              {
                [classes.hide]: index + 1 > nbShow,
              }
            )}
          >
            {child}
          </li>
        ))}
        {(Children.count(children) > nbShow ||
          Children.count(children) > nbShowStep) && (
          <li
            className={cs(
              classes.moreListItem,
              classNames.moreListItem
            )}
          >
            {Children.count(children) > nbShow ? (
              <button
                className={cs(
                  classes.moreButton,
                  classNames.moreButton
                )}
                type="button"
                onClick={handleShowMore}
              >
                {btnMoreMessage}
              </button>
            ) : (
              <div
                className={cs(classes.listEnd, classNames.listEnd)}
              >
                {Children.count(children) > nbShowStep && (
                  <button
                    className={cs(
                      classes.moreButton,
                      classNames.moreButton
                    )}
                    type="button"
                    onClick={() => setNbShow(nbShowStep)}
                  >
                    {btnLessMessage}
                  </button>
                )}
                {linkMoreParams && linkMoreMessage && (
                  <Link {...linkMoreParams} legacyBehavior>
                    <a
                      className={cs(
                        classes.linkMore,
                        classNames.linkMore
                      )}
                    >
                      {linkMoreMessage}
                    </a>
                  </Link>
                )}
              </div>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

MoreList.propTypes = {
  children: PropTypes.node,
  nbShowStep: PropTypes.number,
  itemActive: PropTypes.string,
  linkMoreParams: PropTypes.object,
  linkMoreMessage: PropTypes.string,
  btnMoreMessage: PropTypes.string,
  btnLessMessage: PropTypes.string,
  classNames: PropTypes.shape({
    moreList: classNameType,
    moreListContainer: classNameType,
    moreListItem: classNameType,
    moreButton: classNameType,
    linkMore: classNameType,
    listEnd: classNameType,
  }),
};

MoreList.defaultProps = {
  nbShowStep: 4,
  linkMoreMessage: '',
  btnMoreMessage: '',
  btnLessMessage: '',
  classNames: {},
  linkMoreParams: null,
  itemActive: null,
  children: null,
};
