import React from 'react';
import AccompaniementIcon from 'svgs/accompaniement.svg';
import HandsCheckingIcon from 'svgs/hands-checking.svg';
import GuaranteeIcon from 'svgs/guarantee.svg';
import RepairIcon from 'svgs/repair.svg';
import CarCheckIcon from 'svgs/car-check.svg';
import classes from './index.module.scss';
import { IconWithText } from 'ui-core/atoms';

export const ReinsuranceLogos = () => {

  const logos = [
    {
      label: "Accompagnement personnalisé",
      Icon: AccompaniementIcon,
      classes: {
        icon: [
          classes.icon,
          classes.accompaniementIcon,
        ],
        iconWithTextContainer: classes.iconWithTextContainer,
        text: [classes.text],
      }
    },
    {
      label: "Satisfait ou remboursé (15 jours ou 1000 km)",
      Icon: HandsCheckingIcon,
      classes: {
        icon: [
          classes.icon,
          classes.handsCheckingIcon,
        ],
        iconWithTextContainer: classes.iconWithTextContainer,
        text: [classes.text],
      }
    },
    {
      label: "Garantie 12 mois minimum",
      Icon: GuaranteeIcon,
      classes: {
        icon: [
          classes.icon,
          classes.guaranteeIcon,
        ],
        iconWithTextContainer: classes.iconWithTextContainer,
        text: [classes.text],
      }
    },
    {
      label: "Livraison sur le lieu de votre choix",
      Icon: RepairIcon,
      classes: {
        icon: [
          classes.icon,
          classes.repairIcon,
        ],
        iconWithTextContainer: classes.iconWithTextContainer,
        text: [classes.text],
      }
    },
    {
      label: "Véhicules contrôlés et reconditionnés",
      Icon: CarCheckIcon,
      classes: {
        icon: [
          classes.icon,
          classes.carCheckIcon,
        ],
        iconWithTextContainer: classes.iconWithTextContainerLast,
        text: [classes.text],
      }
    }
  ]

  return (
    <div className={classes.container}>
      {logos.map(({ Icon, label, classes }) => (
        <IconWithText
          key={label}
          Icon={Icon}
          label={
            <p dangerouslySetInnerHTML={{ __html: label }} />
          }
          classNames={classes}
        />
      ))}
    </div>
  );
};

