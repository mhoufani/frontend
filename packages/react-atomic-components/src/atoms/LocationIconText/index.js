import LocationIcon from 'svgs/location.svg';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { classNameType } from 'proptypes';
import classes from './index.module.scss';
import { TextV2 } from 'ui-core/atoms';

export const LocationIconText = ({
  children,
  text,
  classNames,
  textSize,
  iconSize,
}) => (
  <div
    className={cs(
      classes.locationIconTextContainer,
      classNames.locationIconTextContainer
    )}
  >
    <div
      className={cs(
        classes.locationIconTextSubContainer,
        classNames.locationIconTextSubContainer
      )}
    >
      <LocationIcon
        {...iconSize}
        viewBox="0 0 30 40"
        className={cs(classes.icon, classNames.icon)}
      />
      <TextV2
        weight={700}
        size={textSize}
        className={cs(classNames.text)}
      >
        {text}
      </TextV2>
    </div>
    {children}
  </div>
);

LocationIconText.propTypes = {
  textSize: PropTypes.number,
  iconSize: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  children: PropTypes.node,
  text: PropTypes.string,
  classNames: PropTypes.shape({
    locationIconTextContainer: classNameType,
    locationIconTextSubContainer: classNameType,
    icon: classNameType,
    text: classNameType,
  }),
};

LocationIconText.defaultProps = {
  textSize: 12,
  iconSize: {
    height: 20,
    width: 14,
  },
  classNames: {},
};
