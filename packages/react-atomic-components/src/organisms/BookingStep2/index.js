import React from 'react';
import PropTypes from 'prop-types';

import CheckIcon from 'svgs/check.svg';
import CrossIcon from 'svgs/cross-icon.svg';

import classes from './index.module.scss';

import { TitleV2, SectionContainerRounded, Button } from 'ui-core/atoms';
import { ReinsuranceLogos } from 'ui-core/molecules';

export const BookingStep2 = ({ data, navigation }) => {

  return (
    <div>
      <TitleV2 level={3}>Étape 2: Récapitulatif</TitleV2>
      <SectionContainerRounded>
        <p className={classes.title}><b>Vos coordonnées</b></p>
        <div className={classes.dataContainer}>
          <p><b>{data.firstName} {data.lastName}</b></p>
          <p><b>Email: </b>{data.email}</p>
          <p><b>Téléphone: </b>{data.phone}</p>
        </div>
        <br></br>
        <p className={classes.title}><b>Financement et reprise</b></p>
        <div className={classes.dataContainer}>
          <p className={data.financing ? classes.true : classes.false}>
            {data.financing ? <><CheckIcon />{"J'ai besoin d'un financement"}</> : <><CrossIcon />{"Je n'ai pas besoin de financement"}</>}
          </p>
          <p className={data.recovery ? classes.true : classes.false}>
            {data.recovery ? <><CheckIcon />{"J'ai besoin d'une reprise"}</> : <><CrossIcon />{"Je n'ai pas besoin de reprise"}</>}
          </p>
        </div>
        <br></br>
        <ReinsuranceLogos />
      </SectionContainerRounded>
      <br></br>
      <div className={classes.buttonContainer}>
        <Button
          onClick={() => navigation.goBack()}
          variant="primary"
        >
          Étape précédente
        </Button>
        <Button
          onClick={() => navigation.goNext()}
          variant="primary"
        >
          <b>Payer mon acompte (249€)</b>
        </Button>
      </div>
    </div>
  );
};

BookingStep2.propTypes = {
  data: PropTypes.shape({
    lastName: PropTypes.string,
    firstName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    financing: PropTypes.bool,
    recovery: PropTypes.bool,
  }),
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    goNext: PropTypes.func,
    startAgain: PropTypes.func,
  }),
};


export default BookingStep2;

export const stepItems = [
  {
    "title": "Vous remplissez le formulaire avec vos coordonnées et vos informations de paiement.",
  },
  {
    "title": "Vous versez un acompte de 249€, 100% remboursable en cas de changement d'avis.",
  },
  {
    "title": "Le véhicule vous est réservé pour une durée de 72h.",
  },
  {
    "title": "Un conseiller prend contact avec vous afin de vous accompagner pour finaliser votre achat."
  }
]

export const infoBoxText = {
  title: "Satisfait ou remboursé:",
  text: "En cas de changement d'avis, vous récupérez 100% du montant de l’acompte."
}

