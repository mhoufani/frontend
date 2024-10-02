import { useEffect, useRef, useState } from 'react';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import PropTypes from 'prop-types';
import CloseIcon from 'svgs/cross-icon.svg';
import classes from './index.module.scss';
import { Button } from 'ui-core/atoms';

export const OverlayToast = ({
  title,
  children,
  classNames,
  isOpen: isOpenByParent,
  onCloseAction,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenByParent);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [offSet, setOffSet] = useState(null);
  const subContainerRef = useRef(null);
  const contentRef = useRef(null);

  const toggleIsOpen = () => {
    if (isOpen) {
      onCloseAction();
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(isOpenByParent);
  }, [isOpenByParent]);

  useEffect(() => {
    const { current: content } = contentRef;
    const { current: subContainer } = subContainerRef;
    if (content && subContainer) {
      const { width: contentWidth } = content.getBoundingClientRect();
      const {
        top,
        bottom,
        width: subContainerWidth,
      } = subContainer.getBoundingClientRect();

      const widthToAddToOffset =
        (subContainerWidth - contentWidth) / 2;
      setHeight((Math.round(bottom - top) || 0) / 10);
      setWidth(
        (Math.round(contentWidth + widthToAddToOffset) || 0) / 10
      );
    }
  }, []);

  useEffect(() => {
    if (width) {
      setOffSet(-width);
    }
  }, [width]);

  return (
    <div
      className={cs(classes.container, classNames.container)}
      style={{
        height: `${height}rem`,
        transform: `translateX(${isOpen ? 0 : offSet}rem)`,
      }}
    >
      <div
        className={cs(classes.subContainer, classNames.subContainer)}
        ref={subContainerRef}
      >
        <div
          className={cs(
            classes.contentContainer,
            classNames.contentContainer
          )}
          ref={contentRef}
        >
          <span className={cs(classes.title, classNames.title)}>
            {title}
          </span>
          {children}
        </div>

        <Button
          onClick={toggleIsOpen}
          variant="unstyled"
          classNames={{
            button: cs(
              classes[isOpen ? 'closeButton' : 'openButton'],
              classNames[isOpen ? 'closeButton' : 'openButton']
            ),
          }}
        >
          {isOpen ? (
            <CloseIcon
              className={cs(classes.closeIcon, classNames.closeIcon)}
            />
          ) : (
            title
          )}
        </Button>
      </div>
    </div>
  );
};

OverlayToast.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onCloseAction: PropTypes.func,
  classNames: PropTypes.shape({
    container: classNameType,
    title: classNameType,
    subContainer: classNameType,
    contentContainer: classNameType,
    openButton: classNameType,
    closeButton: classNameType,
    closeIcon: classNameType,
  }),
};

OverlayToast.defaultProps = {
  classNames: {},
  onCloseAction: () => null,
};
