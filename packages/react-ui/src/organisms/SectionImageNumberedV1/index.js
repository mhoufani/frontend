import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import { Image, NextBtnLink } from 'ui-core/atoms';
import { HeadingNumbered, InfoBox, Section } from 'ui-core/molecules';

import classes from './index.module.scss';

export const SectionImageNumberedV1 = ({
  content,
  reverseOrder,
  element,
  classNames,
  headingNumberedProps,
  imageProps,
  infoBoxProps,
  buttonProps,
}) => {
  const [primaryButtonProps, secondaryButtonProps] =
    buttonProps || [];

  const image = mobile =>
    imageProps && (
      <div
        className={cs(classes.imageWrapper, classNames.imageWrapper, {
          [classes.imageWrapperMobile]: !!mobile,
        })}
      >
        <Image
          className={cs(
            classes.image,
            classNames.image,
            imageProps.className
          )}
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 500px, calc(100vw - 4rem)"
          src={imageProps.src}
          srcSet={imageProps.srcSet}
        />
      </div>
    );

  return (
    <Section
      classNames={{
        section: cs(classes.section, classNames.section),
      }}
      element={element}
    >
      <div
        className={cs(classes.sectionList, classNames.sectionList, {
          [classes.reverseOrder]: reverseOrder,
        })}
      >
        {image()}
        <div
          className={cs(
            classes.sectionListContent,
            classNames.sectionListContent
          )}
        >
          <HeadingNumbered
            classNames={{
              titleNumberContainer:
                classes.sectionTitleNumberContainer,
              number: classes.stepNumber,
              titleTextContainer: classes.titleTextContainer,
            }}
            description={headingNumberedProps.description}
            stepNumber={headingNumberedProps.stepNumber}
            title={headingNumberedProps.title}
          />
          {image(true)}
          <div
            className={cs(
              classes.sectionNumberedContentContainer,
              classNames.sectionNumberedContentContainer
            )}
          >
            {content}

            {infoBoxProps && (
              <InfoBox
                classNames={{ infoBox: classes.infoBox }}
                title={infoBoxProps.title}
                text={infoBoxProps.content}
                icon={infoBoxProps.icon}
              />
            )}

            {buttonProps && (
              <div
                className={cs(
                  classes.btnContainer,
                  classNames.btnContainer
                )}
              >
                {primaryButtonProps && (
                  <NextBtnLink
                    classNames={{
                      buttonLink: cs(
                        classes.buttonPrimary,
                        primaryButtonProps.className,
                        classNames.buttonPrimary
                      ),
                    }}
                    link={{ href: primaryButtonProps.href }}
                  >
                    {primaryButtonProps.content}
                  </NextBtnLink>
                )}
                {secondaryButtonProps && (
                  <NextBtnLink
                    classNames={{
                      buttonLink: cs(
                        classes.buttonSecondary,
                        secondaryButtonProps.className,
                        classNames.buttonSecondary
                      ),
                    }}
                    link={{ href: secondaryButtonProps.href }}
                  >
                    {secondaryButtonProps.content}
                  </NextBtnLink>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

SectionImageNumberedV1.defaultProps = {
  classNames: {},
  element: 'div',
  headingNumberedProps: {},
  reverseOrder: false,
};

SectionImageNumberedV1.propTypes = {
  buttonProps: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.node,
      className: classNameType,
      href: PropTypes.string,
    })
  ),
  classNames: PropTypes.shape({
    btnContainer: classNameType,
    buttonPrimary: classNameType,
    buttonSecondary: classNameType,
    image: classNameType,
    imageWrapper: classNameType,
    section: classNameType,
    sectionList: classNameType,
    sectionListContent: classNameType,
    sectionNumberedContentContainer: classNameType,
  }),
  content: PropTypes.node,
  element: PropTypes.string,
  headingNumberedProps: PropTypes.shape({
    description: PropTypes.node,
    stepNumber: PropTypes.number,
    title: PropTypes.shape({
      children: PropTypes.string,
    }).isRequired,
  }),
  imageProps: PropTypes.shape({
    src: PropTypes.string,
    srcSet: PropTypes.string,
  }),
  infoBoxProps: PropTypes.shape({
    content: PropTypes.node,
    title: PropTypes.string,
    icon: PropTypes.node,
  }),
  reverseOrder: PropTypes.bool,
};
