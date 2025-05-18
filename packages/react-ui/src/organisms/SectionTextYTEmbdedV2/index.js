import PropTypes from 'prop-types';
import cs from 'classnames';
import { SectionTextYTEmbdedV1 } from 'ui-core/organisms';

import classes from './index.module.scss';

export const SectionTextYTEmbdedV2 = ({ classNames, ...props }) => {
  return (
    <SectionTextYTEmbdedV1
      bodyClassNames={{
        p: cs(classes.p, classNames.p),
      }}
      classNames={{
        bodyContainer: cs(
          classes.bodyContainerFlex,
          classNames.bodyContainerFlex
        ),
        iframeOuter: cs(
          classes.iframeOuter__flex,
          classNames.iframeOuter__flex
        ),
        body: cs(classes.body, classNames.body),
      }}
      {...props}
    ></SectionTextYTEmbdedV1>
  );
};

SectionTextYTEmbdedV2.propTypes = {
  classNames: PropTypes.shape({
    bodyContainerFlex: PropTypes.string,
    iframeOuter__flex: PropTypes.string,
    body: PropTypes.string,
    p: PropTypes.string,
  }),
};
SectionTextYTEmbdedV2.defaultProps = {
  classNames: {},
};
