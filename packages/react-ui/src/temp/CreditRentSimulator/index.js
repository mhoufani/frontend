import React, { useId } from 'react';
import PropTypes from 'prop-types';
import TooltipIcon from 'svgs/information.svg';

import classes from './index.module.scss';

import SliderRange from './SliderRange';
import Dropdown from './Dropdown';
import Checkbox from './Checkbox';

const RentDisplay = ({
  rent,
  rentPrefix,
  currency,
  rentSuffix,
  onClick,
}) => {
  return (
    <button onClick={onClick}>
      <p className={classes.priceResume}>
        {rentPrefix}
        <span className={classes.price}>
          {rent} {currency}
        </span>
        <span className={classes.monthly}>{rentSuffix}</span>
        <span className={classes.tooltip}>
          <TooltipIcon />
        </span>
      </p>
    </button>
  );
};

RentDisplay.propTypes = {
  rent: PropTypes.number,
  rentPrefix: PropTypes.string,
  rentSuffix: PropTypes.string,
  currency: PropTypes.string,
  onClick: PropTypes.func,
};

RentDisplay.defaultProps = {
  rent: 0,
  rentPrefix: 'Dès',
  rentSuffix: '/ mois',
  currency: '€',
  onClick: () => {},
};

const calculeSteps = ({ min, max, step }) => {
  const steps = [];
  for (let i = min; i <= max; i += step) {
    steps.push(i);
  }
  return steps;
};

export const CreditRentSimulator = ({
  titleMessage,
  initialRentValue,
  initialRentRangeParams,
  initialRentCurrency,
  initialRentRangeLabel,
  initialRentInfoMessage,
  initialRentErrorMessage,
  financingDurationInMonthsValue,
  financingDurationRangeParams,
  financingDurationRangeLabel,
  financingDurationSelectPlaceholder,
  financingDurationCurrency,
  mechanicalWarrantyChecked,
  mechanicalWarrantyDesc,
  mechanicalWarrantyTitle,
  rentSimulate,
}) => {
  const checkBoxId = useId();
  return (
    <section className={classes.rentSimulator}>
      <div className={classes.header}>
        <h3 className={classes.title}>{titleMessage}</h3>
      </div>
      <div className={classes.container}>
        <div className={classes.rentContainer}>
          <p className={classes.textBig}>{initialRentRangeLabel}</p>
          <div className={classes.inputNumberInfoContainer}>
            <div className={classes.inputNumberContainer}>
              <input
                type="number"
                name="inputNumber"
                value={initialRentValue}
                min={initialRentRangeParams.min}
                max={initialRentRangeParams.max}
                step={initialRentRangeParams.step}
                className={classes.inputNumber}
                onChange={() => {}}
              />
              <label
                htmlFor="inputNumber"
                id="inputNumber"
                className={classes.inputNumberLabel}
              >
                {initialRentCurrency}
              </label>
            </div>
            <p className={classes.textInfo}>
              {initialRentInfoMessage}
            </p>
          </div>
          <span className={classes.errorLabel}>
            {initialRentErrorMessage}
          </span>
          <div className={classes.sliderRangeContainer}>
            <SliderRange
              value={initialRentValue}
              min={initialRentRangeParams.min}
              max={initialRentRangeParams.max}
              step={initialRentRangeParams.step}
              showLabelValue={false}
              onChange={() => {}}
            />
            <div className={classes.labelContainer}>
              <span className={classes.labelRange}>
                {initialRentRangeParams.min +
                  ' ' +
                  initialRentCurrency}
              </span>
              <span className={classes.labelRange}>
                {initialRentRangeParams.max +
                  ' ' +
                  initialRentCurrency}
              </span>
            </div>
          </div>
        </div>
        <div className={classes.financingDurationContainer}>
          <div className={classes.selectContainer}>
            <p className={classes.textBig}>
              {financingDurationRangeLabel}
            </p>
            <div className={classes.inputContainer}>
              <Dropdown
                value={financingDurationInMonthsValue}
                placeholder={financingDurationSelectPlaceholder}
                label={financingDurationCurrency}
              >
                <ul>
                  <li className={classes.selectPlaceholder}>
                    {financingDurationSelectPlaceholder}
                  </li>
                  {calculeSteps(financingDurationRangeParams).map(
                    (duration, index) => (
                      <li key={index}>
                        <button>{duration}</button>
                      </li>
                    )
                  )}
                </ul>
              </Dropdown>
            </div>
            <div className={classes.rangeContainer}>
              <SliderRange
                value={financingDurationInMonthsValue}
                min={financingDurationRangeParams.min}
                max={financingDurationRangeParams.max}
                step={financingDurationRangeParams.step}
                showLabelValue={false}
                onChange={() => {}}
              />
              <div className={classes.labelContainer}>
                <span className={classes.labelRange}>
                  {financingDurationRangeParams.min +
                    ' ' +
                    financingDurationCurrency}
                </span>
                <span className={classes.labelRange}>
                  {financingDurationRangeParams.max +
                    ' ' +
                    financingDurationCurrency}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.warrantiesContainer}>
          <Checkbox
            classNames={{
              checkbox: classes.checkbox,
              mark: classes.mark,
              checked: classes.checked,
            }}
            checked={mechanicalWarrantyChecked}
            name={'withMechanicalWarranty'}
            id={checkBoxId}
            onChange={() => {}}
          />
          <div className={classes.content}>
            <p className={classes.title}>{mechanicalWarrantyTitle}</p>
            <p className={classes.desc}>{mechanicalWarrantyDesc}</p>
          </div>
        </div>
      </div>
      <div className={classes.footer}>{rentSimulate}</div>
    </section>
  );
};

CreditRentSimulator.propTypes = {
  titleMessage: PropTypes.node,
  initialRentValue: PropTypes.number,
  initialRentRangeLabel: PropTypes.node,
  initialRentInfoMessage: PropTypes.node,
  initialRentErrorMessage: PropTypes.node,
  initialRentRangeParams: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
  }),
  initialRentCurrency: PropTypes.string,
  financingDurationInMonthsValue: PropTypes.number,
  financingDurationRangeLabel: PropTypes.node,
  financingDurationSelectPlaceholder: PropTypes.string,
  financingDurationRangeParams: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
  }),
  financingDurationCurrency: PropTypes.string,
  mechanicalWarrantyTitle: PropTypes.node,
  mechanicalWarrantyChecked: PropTypes.bool,
  mechanicalWarrantyDesc: PropTypes.node,
  rentSimulate: PropTypes.node,
};

// demo for development
// todo: need to be clean in development
CreditRentSimulator.defaultProps = {
  titleMessage: 'Je finance en crédit',
  initialRentValue: 0,
  initialRentRangeParams: { min: 3000, max: 10000, step: 100 },
  initialRentRangeLabel: 'Apport',
  initialRentCurrency: '€',
  initialRentInfoMessage: 'Saisissez un chiffre à la centaine près',
  initialRentErrorMessage:
    'Veuillez saisir un montant supérieur à 3000 €',
  financingDurationRangeLabel: 'Durée',
  financingDurationRangeParams: { min: 12, max: 66, step: 6 },
  financingDurationCurrency: 'mois',
  mechanicalWarrantyChecked: false,
  mechanicalWarrantyTitle: 'Garantie longue durée',
  mechanicalWarrantyDesc: (
    <>
      Votre véhicule est{' '}
      <b>garanti jusqu’à la fin de votre financement</b>, pièces et
      main d’œuvre, sans avance de frais. En cas de panne, vous
      bénéficiez d’un{' '}
      <b>véhicule de remplacement jusqu’à 90 jours.</b>
    </>
  ),
  rentSimulate: <RentDisplay />,
  financingDurationInMonthsValue: 12,
  financingDurationSelectPlaceholder: 'Durée max...',
};
