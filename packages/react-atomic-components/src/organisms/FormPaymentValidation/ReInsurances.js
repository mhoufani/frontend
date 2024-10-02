import PropTypes from 'prop-types';
import cs from 'classnames';

import AccompagnementIcon from 'svgs/accompagnement.svg';
import RecondiIcon from 'svgs/recondi.svg';
import SatisfactionIcon from 'svgs/satisfait.svg';
import LivraisonIcon from 'svgs/livraison.svg';
import GarantieIcon from 'svgs/garanties.svg';

import classes from './index.module.scss';

const defaultEntries = {
  support: {
    icon: () => (
      <AccompagnementIcon
        className={cs(classes.icon, classes.support)}
      />
    ),
    text: 'Accompagnement personnalisé',
  },
  satisfaction: {
    icon: () => (
      <SatisfactionIcon
        className={cs(classes.icon, classes.satisfaction)}
      />
    ),
    text: 'Satisfait ou remboursé (15 jours ou 1000 km)',
  },
  warranty: {
    icon: () => (
      <GarantieIcon className={cs(classes.icon, classes.warranty)} />
    ),
    text: 'Garantie 12 mois minimum',
  },
  delivery: {
    icon: () => (
      <LivraisonIcon className={cs(classes.icon, classes.delivery)} />
    ),
    text: 'Livraison sur le lieu de votre choix',
  },
  reconditionnement: {
    icon: () => (
      <RecondiIcon
        className={cs(classes.icon, classes.reconditionnement)}
      />
    ),
    text: 'Véhicules contrôlés et reconditionnés',
  },
};

export const ReInsurances = ({ entries }) => {
  return (
    <div className={classes.reInsurances}>
      {Object.keys(entries).map((entryKey, key) => {
        const { text } = entries[entryKey];
        const Icon =
          entries[entryKey].icon || defaultEntries[entryKey]?.icon;
        return (
          <div className={classes.entry} key={key}>
            <Icon />
            <span className={classes.text}>
              {text || defaultEntries[entryKey]?.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

ReInsurances.defaultProps = {
  entries: defaultEntries,
};

ReInsurances.propTypes = {
  entries: PropTypes.shape({}),
};
