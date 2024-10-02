import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { PropTypes } from 'prop-types';
import { classNameType } from 'proptypes';
import cs from 'classnames';

import { Button, Text, TextV2, RichText } from 'ui-core/atoms';

import ChevronIcon from 'svgs/arrow-bottom-icon.svg';

import classes from './index.module.scss';

export const Collapsible = ({
  id,
  children,
  classNames,
  isActive,
  title,
  subTitle,
  textContent,
  isDisabled,
  icon: Icon,
  toggleIcon: ToggleIcon,
  onToggle,
}) => {
  const [isOpen, setIsOpen] = useState(isActive);
  const [collapsableBodyHeight, setCollapsableBodyHeight] =
    useState(0);
  const collapsableBodyRef = useRef(null);

  const ToggleIconComponent = useMemo(() => {
    return ToggleIcon ? ToggleIcon : ChevronIcon;
  }, [ToggleIcon]);

  useEffect(() => {
    const { current: collapsableBody } = collapsableBodyRef;
    if (collapsableBody) {
      setCollapsableBodyHeight(
        (collapsableBody.offsetHeight || 0) / 10
      );
    }
  }, []);

  useEffect(() => {
    setIsOpen(isActive);
  }, [isActive]);

  const toggleCollapse = useCallback(() => {
    onToggle ? onToggle() : setIsOpen(!isOpen);
  }, [onToggle]);

  return (
    <div className={cs(classes.container, classNames.container)}>
      <Button
        classNames={{ button: cs(classes.button, classNames.button) }}
        onClick={() => toggleCollapse(id)}
        disabled={isDisabled}
      >
        <div
          className={cs(
            classes.buttonSubContainer,
            classNames.buttonSubContainer
          )}
        >
          {Icon && <Icon className={cs(classes.icon)} />}
          <div
            className={cs(
              classes.titleContainer,
              classNames.titleContainer
            )}
          >
            <TextV2 className={cs(classes.title, classNames.title)}>
              {title}
            </TextV2>
            {subTitle && (
              <Text
                classNames={{
                  text: cs(classes.subTitle, classNames.subTitle),
                }}
                text={subTitle}
              />
            )}
          </div>
        </div>
        {(textContent || children) && (
          <ToggleIconComponent
            isOpen={isOpen}
            className={cs(
              classes.collapseIcon,
              classNames.collapseIcon,
              { [classes.isOpen]: isOpen }
            )}
          />
        )}
      </Button>
      <div
        className={cs(
          classes.collapsableContainer,
          classNames.collapsableContainer,
          { [classes.isOpen]: isOpen },
          { [classNames.isOpen]: isOpen }
        )}
        {...(isOpen && {
          style: {
            maxHeight: `${collapsableBodyHeight + 2}rem`,
          },
        })}
      >
        <div
          ref={collapsableBodyRef}
          className={classes.collapseBody}
        >
          {textContent ? (
            <RichText>{textContent}</RichText>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

Collapsible.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.node,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    .isRequired,
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  textContent: PropTypes.string,
  classNames: PropTypes.shape({
    container: classNameType,
    button: classNameType,
    collapsableContainer: classNameType,
    buttonSubContainer: classNameType,
    titleContainer: classNameType,
    title: classNameType,
    subTitle: classNameType,
    collapseIcon: classNameType,
    isOpen: classNameType,
  }),
  toggleIcon: PropTypes.node,
  onToggle: PropTypes.func,
};

Collapsible.defaultProps = {
  isActive: false,
  isDisabled: false,
  textContent: '',
  classNames: {},
  title: '',
  subTitle: '',
  toggleIcon: null,
  onToggle: null,
  icon: null,
  id: undefined,
};
