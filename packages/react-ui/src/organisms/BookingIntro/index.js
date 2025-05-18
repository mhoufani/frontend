import PropTypes from 'prop-types';
import classes from './index.module.scss';
import { TitleV2, Button, SectionContainerRounded } from 'ui-core/atoms';
import { StepListT1V3, ReinsuranceLogos } from 'ui-core/molecules';

export const BookingIntro = ({ navigation }) => {

  return (
    <div>
      <TitleV2 level={3}>Comment réserver ce véhicule?</TitleV2>
      <SectionContainerRounded>
        <StepListT1V3
          classNames={{
            listItemTitle: classes.listItemTitle
          }}
          stepItems={stepItems}
        />
        <ReinsuranceLogos />
        <div className={classes.buttonContainer}>
          <Button
            onClick={() => navigation.goNext()}
            variant="primary"
            classNames={{ button: classes.button }}
          >
            Réserver le véhicule
          </Button>
        </div>

      </SectionContainerRounded>
    </div>
  );
};

BookingIntro.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    goNext: PropTypes.func,
    startAgain: PropTypes.func,
  }),
}

export const stepItems = [
  {
    "title": <><strong>Vous remplissez le formulaire</strong> avec vos coordonnées et vos informations de paiement.</>,
  },
  {
    "title": <><strong>Vous versez un acompte</strong> de 249€ par carte bancaire.</>,
  },
  {
    "title": <><strong>Le véhicule vous est réservé</strong> pour une durée de 72h.</>,
  },
  {
    "title": <><strong>Un conseiller prend contact avec vous</strong> afin de vous accompagner pour finaliser votre achat.</>,
  }
]

