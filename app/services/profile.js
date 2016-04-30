import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

const {
  computed,
  set
} = Ember;

export default Ember.Service.extend({
  _profile: storageFor('profile'),

  name: computed.readOnly('_profile.name'),
  wins: computed.readOnly('_profile.wins'),
  games: computed.readOnly('_profile.games'),
  authenticated: computed.notEmpty('name'),

  losses: computed('wins', 'games', {
    get() {
      return this.get('games') - this.get('wins');
    }
  }),

  register(name) {
    const profile = this.get('_profile');

    this.reset();
    set(profile, 'name', name);
  },

  recordGame(win) {
    const profile = this.get('_profile');

    set(profile, 'games', this.get('games') + 1);
    if (win) {
      set(profile, 'wins', this.get('wins') + 1);
    }
  },

  reset() {
    this.get('_profile').clear();
  }
});
