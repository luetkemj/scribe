import React, { PropTypes } from 'react';

import style from './monster-details.component.scss';

export default function MonsterDetails({ data }) {
  const { special_abilities, actions } = data;

  let specialAbilitiesToRender;
  if (data.special_abilities) {
    let key = 0;
    specialAbilitiesToRender = special_abilities.map(ability =>
      (<div key={key++} className={style.specialAbility}>
        <p><span className={style.specialAbilityName}>{ability.name}.</span> {ability.desc}</p>
      </div>)
    );
  }

  let actionsToRender;
  if (data.actions) {
    let key = 0;
    actionsToRender = actions.map(action =>
      (<div key={key++} className={style.action}>
        <p><span className={style.actionName}>{action.name}.</span> {action.desc}</p>
      </div>)
    );
  }

  return (
    <section className={style.monsterDetails}>
      <article>
        <header>
          <h1 className={style.name}>{data.name}</h1>
          <h2 className={style.sizeTypeAlignment}>
            {data.size} {data.type} ({data.subtype}), {data.alignment}
          </h2>
        </header>
        <hr />

        <section className={style.statBlock}>
          <p className={style.stat}>
            <span className={style.statName}>Armor Class:</span> {data.armor_class}
          </p>
          <p className={style.stat}>
            <span className={style.statName}>Hit Points:</span> {data.hit_points}
          </p>
          <p className={style.stat}>
            <span className={style.statName}>Speed:</span> {data.speed}
          </p>
        </section>
        <hr />

        <section className={style.abilityScores}>
          <div className={style.ability}>
            <span className={style.abilityName}>WIS</span>
            <span className={style.abilityScore}>{data.wisdom}(+1)</span>
          </div>
          <div className={style.ability}>
            <span className={style.abilityName}>CON</span>
            <span className={style.abilityScore}>{data.constitution}(+1)</span>
          </div>
          <div className={style.ability}>
            <span className={style.abilityName}>DEX</span>
            <span className={style.abilityScore}>{data.dexterity}(+1)</span>
          </div>
          <div className={style.ability}>
            <span className={style.abilityName}>STR</span>
            <span className={style.abilityScore}>{data.strength}(+1)</span>
          </div>
          <div className={style.ability}>
            <span className={style.abilityName}>INT</span>
            <span className={style.abilityScore}>{data.intelligence}(+1)</span>
          </div>
          <div className={style.ability}>
            <span className={style.abilityName}>CHA</span>
            <span className={style.abilityScore}>{data.charisma}(+1)</span>
          </div>
        </section>
        <hr />

        <section className={style.statBlock}>
          <p className={style.stat}>
            <span className={style.statName}>Damage Resistances:</span> {data.damage_resistances}
          </p>
          <p className={style.stat}>
            <span className={style.statName}>
            Condition Immunities:</span> {data.condition_immunities}
          </p>
          <p className={style.stat}>
            <span className={style.statName}>Senses:</span> {data.senses}
          </p>
          <p className={style.stat}>
            <span className={style.statName}>Languages:</span> {data.languages}
          </p>
          <p className={style.stat}>
            <span className={style.statName}>Challenge:</span> {data.challenge_rating}
          </p>
        </section>
        <hr />

        <section className={style.specialAbilities}>
          {specialAbilitiesToRender}
        </section>
        <hr />

        <section className={style.actions}>
          {actionsToRender}
        </section>
        <img src="https://s-media-cache-ak0.pinimg.com/736x/fe/d6/0c/fed60c160d1b53c84f9b6fb186f5107b.jpg" role="presentation" />
      </article>
    </section>
  );
}

MonsterDetails.propTypes = {
  data: PropTypes.object.isRequired,
};
