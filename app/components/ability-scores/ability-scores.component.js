import React, { PropTypes } from 'react';

import style from './ability-scores.component.scss';

export default function AbilityScores(props) {
  let abilityScoresToRender;
  if (props.ability_scores) {
    let key = 0;
    abilityScoresToRender = props.ability_scores.map(abilityScore =>
      (<div key={key += 1} className={style.ability}>
        <span className={style.abilityName}>{abilityScore.abrv}</span>
        <span className={style.abilityScore}>{abilityScore.score}({abilityScore.modifier})</span>
      </div>)
    );
  }

  return (
    <section className={style.abilityScores}>
      {abilityScoresToRender}
    </section>
  );
}

AbilityScores.propTypes = {
  ability_scores: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired
  ).isRequired,
};
