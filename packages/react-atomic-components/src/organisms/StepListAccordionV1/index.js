import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import { RichText } from 'ui-core/atoms';
import { Accordion, StepListT1V3 } from 'ui-core/molecules';

import classes from './index.module.scss';

export const StepListAccordionV1 = ({
  stepListProps,
  classNames,
}) => {
  return (
    <StepListT1V3
      classNames={{
        listContainer: classes.stepList,
        listItem: classNames.listItem,
      }}
      stepItems={stepListProps.map(
        ({ title, content, tag, accordionProps }) => ({
          title,
          tag,
          content: (
            <>
              {content && (
                <div
                  className={cs(
                    classes.stepListContent,
                    classNames.stepListContent
                  )}
                >
                  <RichText>{content}</RichText>
                </div>
              )}
              {accordionProps && (
                <Accordion
                  multipleOpening
                  {...accordionProps}
                  classNames={{
                    collapseIcon: classes.accordionCollapseIcon,
                    titleContainer: classes.accordionItemtitle,
                    accordions: classes.accordionContainer,
                    title: cs(
                      classes.accordionTitle,
                      classNames.accordionTitle
                    ),
                  }}
                  items={accordionProps.items.map(
                    ({ title: accordionTitle, description }) => ({
                      title: accordionTitle,
                      content: (
                        <div
                          className={cs(
                            classes.accordionContent,
                            classNames.accordionContent
                          )}
                        >
                          <RichText>{description}</RichText>
                        </div>
                      ),
                    })
                  )}
                />
              )}
            </>
          ),
        })
      )}
    />
  );
};

StepListAccordionV1.defaultProps = {
  classNames: {},
};

StepListAccordionV1.propTypes = {
  stepListProps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
      tag: PropTypes.string,
      accordionProps: PropTypes.shape({
        items: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
          })
        ),
      }),
    })
  ),
  classNames: PropTypes.shape({
    stepListContent: classNameType,
    accordionContent: classNameType,
    accordionTitle: classNameType,
    listItem: classNameType,
  }),
};
