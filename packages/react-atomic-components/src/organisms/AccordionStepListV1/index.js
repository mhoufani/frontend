import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import { NextBtnLink, RichText } from 'ui-core/atoms';
import { Accordion, StepListT1V3 } from 'ui-core/molecules';

import classes from './index.module.scss';

export const AccordionStepListV1 = ({
  classNames,
  accordionProps,
  infoBoxProps,
}) => {
  return (
    <Accordion
      multipleOpening
      classNames={{
        collapseIcon: classes.accordionCollapseIcon,
        titleContainer: classes.accordionItemtitle,
        accordions: classes.accordionContainer,
      }}
      items={accordionProps.items.map(
        ({ button, description, title, stepListItems = [] }) => ({
          title,
          content: (
            <>
              <div
                className={cs(
                  classes.accordionContent,
                  classNames.accordionContent
                )}
              >
                <RichText>{description}</RichText>
              </div>
              <StepListT1V3
                classNames={{
                  listContainer: classes.stepList,
                  listItem: classes.listItem,
                }}
                stepItems={stepListItems.map(
                  ({ title, content, tag }) => ({
                    content: <RichText>{content}</RichText>,
                    tag,
                    title,
                  })
                )}
              />
              {button && (
                <NextBtnLink
                  classNames={{
                    buttonLink: cs(
                      classes.buttonPrimary,
                      classNames.buttonPrimary
                    ),
                  }}
                  link={{ href: button.href }}
                >
                  {button.content}
                </NextBtnLink>
              )}
            </>
          ),
        })
      )}
    />
  );
};

AccordionStepListV1.defaultProps = {
  accordionProps: { items: [] },
  classNames: {},
};

AccordionStepListV1.propTypes = {
  classNames: PropTypes.shape({
    buttonPrimary: classNameType,
  }),
  accordionProps: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        stepListItems: PropTypes.shape({
          title: PropTypes.string,
          content: PropTypes.string,
          tag: PropTypes.string,
        }),
        button: PropTypes.shape({
          href: PropTypes.string.isRequired,
          content: PropTypes.string.isRequired,
        }),
      })
    ),
  }),
};
