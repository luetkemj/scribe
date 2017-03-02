import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Spinner from '../../../components/spinner/spinner.component';
import DefinitionList from '../../../components/definition-list/definition-list.component';
import AbilityScores from '../../../components/ability-scores/ability-scores.component';

import { loadMonsterIfNeeded } from '../../../actions/monsters.actions';

import style from './monster-details.container.scss';

class MonsterDetailsContainer extends Component {
  componentWillMount() {
    this.props.loadMonsterIfNeeded(this.props.params.id);
  }

  render() {
    const { monster, loadingMonster } = this.props.monstersState;
    let monsterToRender;
    let spinnerToRender;

    if (loadingMonster) {
      spinnerToRender = (
        <Spinner />
      );
    }

    if (monster) {
      let type;
      let abilityScoresToRender;
      let specialAbilitiesToRender;
      let actionsToRender;

      const primaryStatsData = [
        {
          name: 'Armor Class',
          stat: monster.armor_class,
        }, {
          name: 'Hit Points',
          stat: monster.hit_points,
        }, {
          name: 'Speed',
          stat: monster.speed,
        },
      ];

      const secondaryStatsData = [
        {
          name: 'Damage Resistances',
          stat: monster.damage_resistances,
        }, {
          name: 'Condition Immunities',
          stat: monster.condition_immunities,
        }, {
          name: 'Senses',
          stat: monster.senses,
        }, {
          name: 'Languages',
          stat: monster.languages,
        }, {
          name: 'Challenge',
          stat: monster.challenge_rating,
        },
      ];

      if (monster.subtype) {
        type = (
          <span>
            {monster.type} ({monster.subtype}),
          </span>
        );
      } else {
        type = (
          <span>
            {monster.type},
          </span>
        );
      }

      const headerToRender = (
        <header>
          <h1 className={style.name}>{monster.name}</h1>
          <h2 className={style.sizeTypeAlignment}>
            {monster.size} {type} {monster.alignment}
          </h2>
        </header>
      );

      if (monster.ability_scores) {
        abilityScoresToRender = (<AbilityScores ability_scores={monster.ability_scores} />);
      }

      const primaryStatsToRender = (
        <DefinitionList
          definitions={primaryStatsData}
          dd={'stat'}
          dt={'name'}
        />
      );

      const secondaryStatsToRender = (
        <DefinitionList
          definitions={secondaryStatsData}
          dd={'stat'}
          dt={'name'}
        />
      );

      if (monster.special_abilities) {
        specialAbilitiesToRender = (
          <DefinitionList
            definitions={monster.special_abilities}
            dd={'desc'}
            dt={'name'}
            verbose
          />
        );
      }

      if (monster.actions) {
        actionsToRender = (
          <DefinitionList
            definitions={monster.actions}
            dd={'desc'}
            dt={'name'}
            verbose
          />
        );
      }

      monsterToRender = (
        <div className={style.monsterDetails}>
          {headerToRender}
          {abilityScoresToRender}
          {primaryStatsToRender}
          {secondaryStatsToRender}
          {specialAbilitiesToRender}
          {actionsToRender}
        </div>
      );
    }

    return (
      <div>
        {spinnerToRender}
        {monsterToRender}
      </div>
    );
  }
}

MonsterDetailsContainer.propTypes = {
  monstersState: PropTypes.shape({
    monster: PropTypes.shape(),
    loadingMonster: PropTypes.bool,
  }).isRequired,
  loadMonsterIfNeeded: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    monstersState: state.monstersState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadMonsterIfNeeded }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MonsterDetailsContainer);
