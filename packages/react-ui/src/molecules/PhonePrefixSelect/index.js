import React, { useState, useEffect, useRef } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import ArrowBottomIcon from 'svgs/arrow-bottom-icon.svg';

import classes from './index.module.scss';
import { Button } from 'ui-core/atoms';

const defaultPrefix = '+33';

export const PhonePrefixSelect = ({
  classNames,
  countries,
  disabled,
  onSelect,
  onToggle,
  value,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { Icon } = countries[value] || {};

  const handleSelect = (prefix, e) => {
    onSelect(prefix, e);
    setOpen(false);
  };

  useEffect(() => {
    const handleClose = event => {
      if (!containerRef.current?.contains(event.target))
        setOpen(false);
    };

    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  }, []);

  useEffect(() => {
    onToggle(open);
  }, [open]);

  return (
    <div
      className={cs(
        classes.prefixSelectContainer,
        classNames.prefixSelectContainer
      )}
    >
      <div
        className={cs(classes.prefixSelect, classNames.prefixSelect)}
        ref={containerRef}
      >
        <Button
          format="empty"
          classNames={{
            button: cs(classes.current, classNames.current, {
              [classes.disabled]: disabled,
            }),
          }}
          onClick={() => !disabled && setOpen(!open)}
        >
          {Icon && (
            <Icon className={cs(classes.flag, classes.currentFlag)} />
          )}
          <ArrowBottomIcon className={cs(classes.arrowBottom)} />
        </Button>
        {open && (
          <div className={cs(classes.menu, classNames.menu)}>
            <ul className={cs(classes.menuInner)}>
              {Object.keys(countries).map((prefix, key) => {
                const SvgComponent = countries[prefix].Icon;

                return (
                  <li className={cs(classes.option)} key={key}>
                    <Button
                      format="empty"
                      onClick={e => handleSelect(prefix, e)}
                      classNames={{ button: classes.button }}
                    >
                      {SvgComponent && (
                        <SvgComponent className={cs(classes.flag)} />
                      )}
                      <span
                        className={cs(classes.label)}
                      >{`${countries[prefix].label} ${prefix}`}</span>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <div className={cs(classes.prefix, classNames.prefix)}>
        {value}
      </div>
    </div>
  );
};

PhonePrefixSelect.propTypes = {
  countries: PropTypes.shape({
    Icon: PropTypes.node,
  }),
  value: PropTypes.string,
  onSelect: PropTypes.func,
  onToggle: PropTypes.func,
  classNames: PropTypes.shape({
    prefixSelectContainer: classNameType,
    prefixSelect: classNameType,
    prefix: classNameType,
    current: classNameType,
    menu: classNameType,
  }),
};

PhonePrefixSelect.defaultProps = {
  onSelect: () => null,
  onToggle: () => null,
  value: defaultPrefix,
  classNames: {},
  countries: {},
};
