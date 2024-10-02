import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useClickOutside } from 'hooks';
import cs from 'classnames';
import ArrowBottomIcon from 'svgs/arrow-bottom-icon.svg';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { classNameType } from 'proptypes';
import classes from '../index.module.scss';

const Dropdown = ({
  children,
  value,
  placeholder,
  open,
  closeContentOnClick,
  onClickOutside,
  controlled,
  classNames,
  icon,
  onChange,
  withBorder,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const [isScroll, setIsScroll] = useState(false);
  const node = useRef(null);
  const contentNode = useRef(null);
  const scrollTimer = useRef(null);

  useEffect(() => {
    controlled && setIsOpen(open);
  }, [controlled, open]);

  const handleScroll = useCallback(() => {
    clearTimeout(scrollTimer.current);
    if (!isScroll) setIsScroll(true);
    scrollTimer.current = setTimeout(() => setIsScroll(false), 300);
  }, [isScroll]);

  useEffect(() => {
    const content = contentNode.current;
    if (isOpen) {
      content && content.addEventListener('scroll', handleScroll);
    }
    return () => {
      content && content.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer.current);
    };
  }, [isOpen, handleScroll]);

  useClickOutside(node, () => {
    controlled ? onChange(false) : setIsOpen(false);
    onClickOutside();
  });

  return (
    <div
      ref={node}
      className={cs(classes.dropdown, classNames.dropdown, {
        [classes.withBorder]: withBorder,
        [classNames.withBorder]: withBorder,
      })}
    >
      <button
        type="button"
        onClick={() => {
          controlled ? onChange(!isOpen) : setIsOpen(!isOpen);
        }}
        className={cs(classes.dropdownBtn, classNames.dropdownBtn, {
          [classes.dropdownOpen]: isOpen,
          [classNames.dropdownBtnOpen]: isOpen,
          [classes.dropdownBtnPlaceholder]: !value,
          [classNames.dropdownBtnPlaceholder]: !value,
        })}
      >
        {!!value ? value : placeholder}
        {typeof icon === 'function' ? (
          icon(isOpen)
        ) : (
          <ArrowBottomIcon
            className={cs(
              classes.arrowIcon,
              classNames.dropdownBtnIcon,
              {
                [classes.arrowIconOpen]: isOpen,
              }
            )}
          />
        )}
        <label className={classes.inputSelectLabel}>{label}</label>
      </button>
      <Transition
        mountOnEnter
        unmountOnExit
        in={isOpen}
        timeout={100}
      >
        {state => (
          <div
            aria-hidden="true"
            ref={contentNode}
            onClick={() => closeContentOnClick && setIsOpen(false)}
            className={cs(
              classes.dropdownContent,
              classes[state],
              classNames.dropdownContent,
              {
                [classes.scrollbarVisible]: isScroll,
              }
            )}
          >
            {children}
          </div>
        )}
      </Transition>
    </div>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node,
  value: PropTypes.any,
  open: PropTypes.bool,
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  closeContentOnClick: PropTypes.bool,
  onClickOutside: PropTypes.func,
  controlled: PropTypes.bool,
  onChange: PropTypes.func,
  classNames: PropTypes.shape({
    dropdown: classNameType,
    dropdownBtn: classNameType,
    withBorder: classNameType,
    dropdownBtnOpen: classNameType,
    dropdownBtnIcon: classNameType,
    dropdownContent: classNameType,
    dropdownBtnPlaceholder: classNameType,
  }),
  icon: PropTypes.func,
  withBorder: PropTypes.bool,
  label: PropTypes.string,
};

Dropdown.defaultProps = {
  value: null,
  open: false,
  placeholder: '',
  closeContentOnClick: true,
  onChange: () => null,
  onClickOutside: () => null,
  controlled: false,
  classNames: {},
  icon: null,
  withBorder: true,
  children: null,
  label: '',
};

export default Dropdown;
