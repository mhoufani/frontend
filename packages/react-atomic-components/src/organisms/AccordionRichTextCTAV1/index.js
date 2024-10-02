import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import { NextBtnLink, RichText } from 'ui-core/atoms';
import { Accordion } from 'ui-core/molecules';

import classes from './index.module.scss';

export const AccordionRichTextCTAV1 = ({
  classNames,
  accordionProps,
  infoBoxProps,
}) => {
  return (
    <Accordion
      multipleOpening
      classNames={{
        collapseIcon: classes.accordionCollapseIcon,
        accordions: classes.accordionContainer,
        title: classes.accordionTitle,
      }}
      items={accordionProps.items.map(
        ({ buttonProps, content, title }) => ({
          title,
          content: (
            <>
              <div
                className={cs(
                  classes.accordionContent,
                  classNames.accordionContent
                )}
              >
                <RichText>{content}</RichText>
              </div>
              {buttonProps && (
                <NextBtnLink
                  classNames={{
                    buttonLink: cs(
                      classes.buttonPrimary,
                      classNames.buttonPrimary
                    ),
                  }}
                  link={{
                    href: buttonProps.href,
                  }}
                >
                  {buttonProps.content}
                </NextBtnLink>
              )}
            </>
          ),
        })
      )}
    />
  );
};

AccordionRichTextCTAV1.defaultProps = {
  accordionProps: { items: [] },
  classNames: {},
};

AccordionRichTextCTAV1.propTypes = {
  classNames: PropTypes.shape({
    infoBoxContainer: classNameType,
    content: classNameType,
    buttonPrimary: classNameType,
  }),
  accordionProps: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.node,
        buttonProps: PropTypes.shape({
          href: PropTypes.string,
          content: PropTypes.string,
        }),
      })
    ),
  }),
  infoBoxProps: PropTypes.shape({
    content: PropTypes.node,
    title: PropTypes.string,
    icon: PropTypes.node,
  }),
};
