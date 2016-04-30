import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

const {
  computed,
  set
} = Ember;

export default Ember.Service.extend({
  profile: storageFor('profile'),

  name: computed.readOnly('profile.name'),
  wins: computed.readOnly('profile.wins'),
  games: computed.readOnly('profile.games'),
  loses: computed('wins', 'games', {
    get() {
      return this.get('games') - this.get('wins');
    }
  }),

  register(name) {
    const profile = this.get('profile');

    this.reset();
    set(profile, 'name', name);
  },

  recordGame(win) {
    const profile = this.get('profile');

    set(profile, 'games', this.get('games') + 1);
    if (win) {
      set(profile, 'wins', this.get('wins') + 1);
    }
  }

  reset(name) {
    this.get('profile').clear();
  }
});
