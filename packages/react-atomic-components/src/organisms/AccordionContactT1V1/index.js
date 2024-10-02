import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import {
  NextBtnLink,
  RichText,
  TogglePlusMinus,
} from 'ui-core/atoms';
import { Accordion, Section, ContactT1V1 } from 'ui-core/molecules';
import classes from './index.module.scss';

export const AccordionContactT1V1 = ({
  accordionTitleFirstItem,
  accordionContentFirstItem,
  accordionTitleSecondItem,
  accordionContentSecondItem,
  accordionTitleThirdItem,
  accordionContentThirdItem,
  button,
  buttonText,
  classNames = {},
  imageData,
  title,
  text,
  phone,
  sectionProps,
}) => {
  return (
    <Section {...sectionProps}>
      <div
        className={cs(
          classes.containerAccordionContact,
          classNames.containerAccordionContact
        )}
      >
        <div className={classes.accordionButtonContainer}>
          <Accordion
            multipleOpening
            toggleIcon={TogglePlusMinus}
            classNames={{
              collapseIcon: classes.accordionCollapseIcon,
              titleContainer: classes.accordionItemtitle,
              accordions: classes.accordionContainer,
              isOpen: classes.isOpen,
              title: classes.accordionTitle,
            }}
            items={[
              {
                title: accordionTitleFirstItem,
                content: (
                  <>
                    <RichText>{accordionContentFirstItem}</RichText>
                  </>
                ),
              },
              {
                title: accordionTitleSecondItem,
                content: (
                  <>
                    <RichText>{accordionContentSecondItem}</RichText>
                  </>
                ),
              },
              {
                title: accordionTitleThirdItem,
                content: (
                  <>
                    <RichText>{accordionContentThirdItem}</RichText>
                  </>
                ),
              },
            ]}
          />
          {button && (
            <NextBtnLink
              classNames={{
                buttonLink: cs(
                  classes.buttonAccordion,
                  classNames.buttonAccordion
                ),
              }}
              link={{ href: button.href }}
            >
              {button.content}
            </NextBtnLink>
          )}
        </div>
        <ContactT1V1
          title={title}
          text={text}
          phone={phone}
          buttonText={buttonText}
          imageData={imageData}
          classNames={{
            containerContact: classes.containerContact,
            contentContainer: classes.contentContainer,
            title: classes.title,
            buttonLink: classes.buttonLink,
          }}
        />
      </div>
    </Section>
  );
};

AccordionContactT1V1.defaultProps = {
  classNames: {},
  sectionProps: {},
};

AccordionContactT1V1.propTypes = {
  accordionTitleFirstItem: PropTypes.string,
  accordionContentFirstItem: PropTypes.string,
  accordionTitleSecondItem: PropTypes.string,
  accordionContentSecondItem: PropTypes.string,
  accordionTitleThirdItem: PropTypes.string,
  accordionContentThirdItem: PropTypes.string,
  button: PropTypes.shape({
    href: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
  title: PropTypes.string,
  text: PropTypes.string,
  phone: PropTypes.string,
  buttonText: PropTypes.string,
  imageData: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    placeholderSrc: PropTypes.string,
  }),
  classNames: PropTypes.shape({
    containerAccordionContact: classNameType,
    buttonAccordion: classNameType,
  }),
};
