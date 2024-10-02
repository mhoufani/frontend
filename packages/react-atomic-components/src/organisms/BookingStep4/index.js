import React from 'react';
import PropTypes from 'prop-types';
import CheckIcon from 'svgs/check.svg';
import CrossIcon from 'svgs/cross-icon.svg';
import classes from './index.module.scss';
import { TitleV2, SectionContainerRounded, Button } from 'ui-core';

const renderSuccessMessage = (navigation) => (
  <div className={classes.messageContainer}>
    <CheckIcon className={`${classes.icon} ${classes.true}`} />
    <TitleV2 level={3}>Votre véhicule est réservé !</TitleV2>
    <p>
      <b>Merci pour votre réservation. Un conseiller va prendre contact avec vous rapidement.</b>
    </p>
    <p>
      Toute notre équipe est à votre disposition pour échanger sur la suite de votre projet.
    </p>
    <div className={classes.buttonsContainer}>
      <Button
        onClick={() => navigation.goNext()}
        variant="tertiary"
      >
        Me faire rappeler par un conseiller
      </Button>
    </div>
  </div>
);

const renderFailureMessage = (navigation) => (
  <div className={classes.messageContainer}>
    <CrossIcon className={`${classes.icon} ${classes.false}`} />
    <TitleV2 level={3}>Le paiement a échoué.</TitleV2>
    <p>
      <b>Le prélèvement n’a pas pu aboutir à cause d’un problème technique.</b>
    </p>
    <p>
      Vous pourrez retenter votre chance dans quelques instants.
    </p>
    <div className={classes.buttonsContainer}>
      <Button
        onClick={() => navigation.goBack()}
        variant="primary"
      >
        Réessayer
      </Button>
    </div>

  </div>
);

export const BookingStep4 = ({ navigation, paymentSuccess }) => {

  return (
    <div>
      <TitleV2 level={3}>Étape 4: Confirmation</TitleV2>
      <SectionContainerRounded>
        {paymentSuccess ? renderSuccessMessage(navigation) : renderFailureMessage(navigation)}
      </SectionContainerRounded>
    </div>
  );
};

BookingStep4.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    goNext: PropTypes.func,
    startAgain: PropTypes.func,
  }),
  paymentSuccess: PropTypes.bool,
}
