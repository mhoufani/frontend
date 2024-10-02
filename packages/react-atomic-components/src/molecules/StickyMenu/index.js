import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';

import { ContainerV2, ScrollX } from 'ui-core/atoms';

import classes from './index.module.scss';

const THRESHOLD = 0.2;

export const StickyMenu = ({ classNames, menuItems, sticky0 }) => {
  const [current, setCurrent] = useState(null);
  const outerRef = useRef(null);
  const scrollXRef = useRef(null);
  const menuRef = useRef(null);
  const menuIds = menuItems.map(({ menuId }) => menuId);

  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const outerHeight = outerRef.current?.offsetHeight;
    const outerTop = outerRef.current?.offsetTop;
    const outerBottom = outerTop + outerHeight;
    const offsetTopTrigger = outerBottom + windowHeight * THRESHOLD;

    menuIds.map(menuId => {
      const current = document.getElementById(menuId);
      if (current) {
        const topSection = current.offsetTop;
        const bottomSection = topSection + current.offsetHeight;

        if (
          offsetTopTrigger >= topSection &&
          offsetTopTrigger <= bottomSection &&
          menuId !== current
        ) {
          setCurrent(menuId);
        }
      }
    });
  }, [menuIds]);

  useEffect(() => {
    const timeout = (() => {
      if (current) {
        const menuItemCurrent = menuRef.current?.querySelectorAll(
          `.${classes.item}[data-menuId="${current}"]`
        )?.[0];

        if (menuItemCurrent) {
          const left =
            menuItemCurrent.offsetLeft - menuRef.current.offsetLeft;

          return setTimeout(() => {
            scrollXRef.current.scrollTo({ left, behavior: 'smooth' });
          }, 500);
        }
      }
    })();

    return () => {
      clearTimeout(timeout);
    };
  }, [current]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return menuItems ? (
    <div
      className={cs(classes.outer, classNames.outer, {
        [classes.sticky0]: sticky0,
      })}
      ref={outerRef}
    >
      <ContainerV2 classNames={{ container: classNames.container }}>
        <ScrollX
          classNames={{
            outer: cs(classes.scollXOuter, classNames.scollXOuter),
            inner: cs(classes.scollXInner, classNames.scollXInner),
          }}
          ref={scrollXRef}
        >
          <menu
            className={cs(classes.stickyMenu, classNames.stickyMenu)}
            ref={menuRef}
          >
            {menuItems.map(({ content, menuId }, key) => (
              <li
                key={key}
                className={cs(classes.item, classNames.item)}
                data-menuId={menuId}
              >
                <a
                  className={cs(
                    classes.itemLink,
                    classNames.itemLink,
                    { [classes.currentLink]: current === menuId }
                  )}
                  href={`#${menuId}`}
                >
                  {content}
                </a>
              </li>
            ))}
          </menu>
        </ScrollX>
      </ContainerV2>
    </div>
  ) : null;
};

StickyMenu.propTypes = {
  classNames: PropTypes.shape({
    button: classNameType,
    container: classNameType,
    item: classNameType,
    itemLink: classNameType,
    outer: classNameType,
    scollXOuter: classNameType,
    scollXInner: classNameType,
    stickyMenu: classNameType,
  }),
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      current: PropTypes.bool,
      menuId: PropTypes.string,
    })
  ),
  sticky0: PropTypes.bool,
};

StickyMenu.defaultProps = {
  classNames: {},
  sticky0: false,
};
