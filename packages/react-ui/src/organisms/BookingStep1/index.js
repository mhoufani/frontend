import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { fieldValidation } from 'util-common/checker';
import { Maybe } from 'util-common/entity';

import classes from './index.module.scss';
import { Button, TitleV2, Label, SectionContainerRounded, Checkbox, Field, Input } from 'ui-core/atoms';
import { InputPhone, ReinsuranceLogos } from 'ui-core/molecules';

export const BookingStep1 = ({
  navigation
}) => {

  const [errorsForm, setErrorsForm] = useState({});
  const [phonePrefix, setPhonePrefix] = useState();

  const [values, setValues] = useState({});

  const handlePrefixChange = newPhonePrefix => {
    const { phone } = values;
    setPhonePrefix(newPhonePrefix);
    setValues({
      ...values,
      phone: `${phone || ''}`.replace(phonePrefix, newPhonePrefix),
    });
  };

  const handleInputChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleCheckboxClick = ({ target: { checked, name } }) => {
    setValues({ ...values, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorsForm = fieldValidation(values, messages)
    Maybe(Object.keys(errorsForm).length ? errorsForm : null)
      .fork(
        () => navigation.goNext(values),
        () => setErrorsForm(errorsForm)
      );
  }

  return (
    <>
      <TitleV2 level={3}>Étape 1: Vos coordonnées</TitleV2>
      <form
        onSubmit={handleSubmit}
      >
        <SectionContainerRounded>
          <div data-cs-mask className={classes.fields}>
            <TitleV2 level={4}><b>Vos coordonnées</b></TitleV2>
            <div className={classes.labelsContainer}>
              <Field
                error={errorsForm.firstName}
                classNames={{
                  field: classes.field,
                  container: classes.fieldContainer,
                  error: classes.error
                }}
              >
                <Label text={"Prénom*"} className={classes.label} />
                <Input
                  error={errorsForm.firstName}
                  className={cs(classes.input, { [classes.inputError]: errorsForm.firstName })}
                  classNames={{ container: classes.inputContainer }}
                  type="text"
                  name="firstName"
                  placeholder="Ex: Marie"
                  value={values.firstName}
                  onChange={handleInputChange}
                />
              </Field>
              <Field
                error={errorsForm.lastName}
                classNames={{
                  field: classes.field,
                  container: classes.fieldContainer,
                  error: classes.error
                }}
              >
                <Label text={"Nom*"} className={classes.label} />
                <Input
                  error={errorsForm.lastName}
                  className={cs(classes.input, { [classes.inputError]: errorsForm.lastName })}
                  classNames={{ container: classes.inputContainer }}
                  type="text"
                  name="lastName"
                  placeholder="Ex: Dubois"
                  value={values.lastName}
                  onChange={handleInputChange}
                />
              </Field>
            </div>
            <div className={classes.labelsContainer}>
              <Field
                error={errorsForm.email}
                classNames={{
                  field: classes.field,
                  container: classes.fieldContainer,
                  error: classes.error
                }}
              >
                <Label text={"Email*"} className={classes.label} />
                <Input
                  error={errorsForm.email}
                  className={cs(classes.input, { [classes.inputError]: errorsForm.email })}
                  classNames={{ container: classes.inputContainer }}
                  type="email"
                  name="email"
                  placeholder="Ex: m.dubois@gmail.com"
                  value={values.email}
                  onChange={handleInputChange}
                />
              </Field>
            </div>
            <div className={classes.labelsContainer}>
              <Field
                error={errorsForm.phone}
                classNames={{
                  field: classes.field,
                  container: cs(classes.container, classes.phoneInput, {
                    [classes.phoneInputError]: errorsForm.phone
                  }),
                  error: classes.phoneError
                }}
              >
                <Label text={"Téléphone*"} className={classes.label} />
                <InputPhone
                  prefix={phonePrefix}
                  error={errorsForm.phone}
                  name="phone"
                  placeholder="612345678"
                  value={values.phone}
                  onChange={handleInputChange}
                  onPrefixChange={handlePrefixChange}
                />
              </Field>
            </div>
          </div>
          <div data-cs-mask className={classes.fields}>
          </div>
          <div className={classes.fieldChoice}>
            <div className={classes.checkboxContainer}>
              <Checkbox
                name="financing"
                onChange={handleCheckboxClick}
                checked={values.financing}
                classNames={{ containerBox: classes.containerBox }}
              />
              <div>
                <span
                  dangerouslySetInnerHTML={{
                    __html: messages.financingSentence.defaultMessage
                  }}
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: messages.financingSubText.defaultMessage
                  }}
                  className={classes.subText}
                />
              </div>
            </div>
            <div className={classes.checkboxContainer}>
              <Checkbox
                name="recovery"
                onChange={handleCheckboxClick}
                checked={values.recovery}
                classNames={{
                  containerBox: classes.containerBox,
                  checkboxMark: classes.checkboxMark,
                }}
              />
              <div>
                <span
                  dangerouslySetInnerHTML={{
                    __html: messages.recoverySentence.defaultMessage
                  }}
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: messages.recoverySubText.defaultMessage
                  }}
                  className={classes.subText}
                />
              </div>
            </div>
          </div>
          <br></br>
          <ReinsuranceLogos />
        </SectionContainerRounded>
        <div className={classes.buttonsContainer}>
          <div className={classes.buttonContainer}>
            <Button
              classNames={{
                button: classes.button
              }}
              onClick={() => navigation.goBack()}
              variant="primary"
            >
              Étape précédente
            </Button>
          </div>
          <div className={classes.buttonContainer}>
            <Button
              classNames={{
                button: classes.button
              }}
              onClick={() => navigation.goNext()}
              variant="primary"
            >
              Étape suivante
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

BookingStep1.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    goNext: PropTypes.func,
    startAgain: PropTypes.func,
  }),
}

export const messages = {
  lastName: {
    id: 'contactPopup.lastName',
    defaultMessage: 'Nom*',
  },
  firstName: {
    id: 'contactPopup.firstName',
    defaultMessage: 'Prénom*',
  },
  email: {
    id: 'contactPopup.email.TRUE_FRIENDS',
    defaultMessage: 'Email',
  },
  phoneLabel: {
    id: 'contactPopup.phoneLabel',
    defaultMessage: 'Telephone',
  },
  phone: {
    id: 'contactPopup.phone.TRUE_FRIENDS',
    defaultMessage: '1 23 45 67 89',
  },
  budget: {
    id: 'contactPopup.budget.TRUE_FRIENDS(en)',
    defaultMessage: ' Budget',
  },
  recoverySentence: {
    id: 'contactPopup.recoverySentence',
    defaultMessage: "<strong>J'ai besoin d'une reprise</strong>",
  },
  recoverySubText: {
    id: 'contactPopup.recoverySubText',
    defaultMessage: "Je souhaite faire reprendre mon véhicule actuel afin de constituer un apport pour mon achat.",
  },
  financingSentence: {
    id: 'contactPopup.financingSentence',
    defaultMessage: "<strong>J'ai besoin d'un financement</strong>",
  },
  financingSubText: {
    id: 'contactPopup.financingSubText',
    defaultMessage: "Je souhaite être accompagné pour le financement de mon véhicule en crédit ou en leasing (Location avec Option d’Achat).",
  },
  send: {
    id: 'contactPopup.send',
    defaultMessage: 'Envoyer',
  },
  sending: {
    id: 'contactPopup.sending',
    defaultMessage: 'Envoi en cours...',
  },
  sended: {
    id: 'contactPopup.sended',
    defaultMessage: 'Votre demande a bien été envoyée',
  },
  firstNameMandatory: {
    id: 'contactPopup.firstNameMandatory',
    defaultMessage: '*Le prénom est obligatoire.',
  },
  lastNameMandatory: {
    id: 'contactPopup.lastNameMandatory',
    defaultMessage: '*Le nom est obligatoire.',
  },
  emailMandatory: {
    id: 'contactPopup.emailMandatory',
    defaultMessage: "*L'email est obligatoire.",
  },
  emailInvalid: {
    id: 'contactPopup.emailInvalid',
    defaultMessage: '*Renseignez un email valide.',
  },
  phoneMandatory: {
    id: 'contactPopup.phoneNumberMandatory',
    defaultMessage: '*Le téléphone est obligatoire',
  },
  phoneInvalid: {
    id: 'contactPopup.phoneInvalid',
    defaultMessage: 'Renseignez un téléphone valide',
  },
  budgetInvalid: {
    id: 'contactPopup.budgetInvalid',
    defaultMessage: 'Veuillez saisir un montant valide',
  },
  apiError: {
    id: 'contactPopup.apiError',
    defaultMessage:
      'Un erreur est survenue lors de votre validation ! Veuillez réessayez plus tard ou contactez nous au <a href="tel:{tel}" style="text-decoration: underline;">{number}</a>.',
  },
  contactAdvisor: {
    id: 'contactPopup.contactAdvisor',
    defaultMessage: 'Contacter un conseiller',
  },
  contactPartner: {
    id: 'contactPopup.contactPartner',
    defaultMessage:
      'Ou avec un de nos conseillers spécialistes au : ',
  },
  contactMe: {
    id: 'contactPopup.contactMe',
    defaultMessage: 'Me faire rappeler',
  },
  thisInformations: {
    id: 'contactPopup.thisInformations',
    defaultMessage: 'Ces informations',
  },
  legalNoticesSentence: {
    id: 'contactPopup.legalNoticesSentence',
    defaultMessage:
      'nous permettront de répondre à votre demande de contact.',
  },
};


const isEmpty = value => {
  return (
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};
