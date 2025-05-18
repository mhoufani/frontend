import cs from 'classnames';
import PropTypes from 'prop-types';

import { classNameType } from 'proptypes';
import { Image } from 'ui-core/atoms';
import { SocialRatingItem } from 'ui-core/molecules';
import LogoSg from 'svgs/logo-sg-inline.svg';

import classes from './index.module.scss';

export const SocialRatingTextImgV2 = ({
  autoPlusContent,
  autoPlusIcon,
  nbNotice,
  note,
  noteScale,
  socialIcon,
  classNames,
}) => (
  <div className={cs(classes.container, classNames.container)}>
    <div className={cs(classes.inner, classNames.inner)}>
      <SocialRatingItem
        socialIcon={socialIcon}
        ratingNote={note}
        rateOut={noteScale}
        ratingCount={nbNotice}
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
      <div className={cs(classes.autoPlus, classNames.autoPlus)}>
        <Image
          alt="Auto Plus"
          className={cs(
            classes.autoPlusImage,
            classNames.autoPlusImage
          )}
          src={autoPlusIcon}
        />
        <div
          className={cs(
            classes.autoPlusContent,
            classNames.autoPlusContent
          )}
        >
          {autoPlusContent}
        </div>
      </div>
      <div>
        <LogoSg className={cs(classes.logo, classNames.logo)} />
      </div>
    </div>
  </div>
);

SocialRatingTextImgV2.propTypes = {
  autoPlusContent: PropTypes.node.isRequired,
  autoPlusIcon: PropTypes.string.isRequired,
  nbNotice: PropTypes.string,
  note: PropTypes.number,
  noteScale: PropTypes.number,
  socialIcon: PropTypes.string,
  classNames: PropTypes.shape({
    container: classNameType,
    inner: classNameType,
    root: classNameType,
    ratingContainer: classNameType,
    ratingNote: classNameType,
    logo: classNameType,
    ratingCountText: classNameType,
    autoPlus: classNameType,
    autoPlusImage: classNameType,
    autoPlusContent: classNameType,
    imgContainer: classNameType,
  }),
};

SocialRatingTextImgV2.defaultProps = {
  autoPlusContent:
    'Élu meilleur distributeur automobiles 2024 pour la seconde fois',
  nbNotice: '',
  note: null,
  noteScale: null,
  socialIcon: '',
  satisfied: 0,
  classNames: {},
  clients: '',
};

export default SocialRatingTextImgV2;
