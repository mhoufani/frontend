import PropTypes from 'prop-types';
import CrossIcon from 'svgs/cross-icon.svg';
import cs from 'classnames';
import classes from './index.module.scss';
import { Button } from 'ui-core/atoms';

export const Popup = ({ onPopupClose, children, classNames }) => {
  const closeOnBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onPopupClose();
    }
  };

  return (
    <div data-qa="popin">
      <div
        className={cs(classes.backdrop, classNames.backdrop)}
        onClick={closeOnBackdropClick}
      >
        <div className={cs(classes.popup, classNames.popup)}>
          <Button
            variant="unstyled"
            classNames={{
              button: cs(classes.btnClose, classNames.btnClose),
            }}
            onClick={onPopupClose}
          >
            <CrossIcon
              className={cs(classes.closeIcon, classNames.closeIcon)}
            />
          </Button>
          {children}
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  classNames: PropTypes.shape({
    backdrop: PropTypes.string,
    popup: PropTypes.string,
    btnClose: PropTypes.string,
    closeIcon: PropTypes.string,
  }),
  onPopupClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Popup.defaultProps = {
  classNames: {},
};
