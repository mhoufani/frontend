import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import { SocialRatingItem } from 'ui-core/molecules';
import { formatNbSpacing } from 'util-common/formatter';

import LogoSg from 'svgs/logo-sg-inline.svg';

import classes from './index.module.scss';

export const SocialRatingTextImgV1 = ({
  nbNotice,
  note,
  noteScale,
  satisfied,
  classNames,
  clients,
  socialIcon,
  socialIconAlt,
}) => {
  return (
    <div className={cs(classes.container, classNames.container)}>
      <div className={cs(classes.inner, classNames.inner)}>
        <SocialRatingItem
          ratingNote={note}
          rateOut={noteScale}
          ratingCount={nbNotice}
          socialIcon={socialIcon}
          socialIconAlt={socialIconAlt}
          classNames={{
            root: [classes.root, classNames.root],
            ratingContainer: [
              classes.ratingContainer,
              classNames.ratingContainer,
            ],
            ratingNote: [classes.ratingNote, classNames.ratingNote],
            ratingCountText: [
              classes.ratingCountText,
              classNames.ratingCountText,
            ],
            imgContainer: classNames.imgContainer,
          }}
        />
        <div className={cs(classes.clients, classNames.clients)}>
          <span
            className={cs(classes.nbClients, classNames.nbClients)}
          >
            {formatNbSpacing(satisfied)}
          </span>{' '}
          {clients}
        </div>
        <div>
          <LogoSg className={cs(classes.logo, classNames.logo)} />
        </div>
      </div>
    </div>
  );
};

SocialRatingTextImgV1.propTypes = {
  nbNotice: PropTypes.string,
  note: PropTypes.number,
  socialIcon: PropTypes.string,
  socialIconAlt: PropTypes.string,
  noteScale: PropTypes.number,
  satisfied: PropTypes.number,
  clients: PropTypes.string,
  classNames: PropTypes.shape({
    container: classNameType,
    inner: classNameType,
    root: classNameType,
    ratingContainer: classNameType,
    ratingNote: classNameType,
    nbClients: classNameType,
    logo: classNameType,
    ratingCountText: classNameType,
    clients: classNameType,
    imgContainer: classNameType,
  }),
};

SocialRatingTextImgV1.defaultProps = {
  nbNotice: '',
  note: null,
  noteScale: null,
  socialIcon: '',
  satisfied: 0,
  classNames: {},
  clients: '',
};
