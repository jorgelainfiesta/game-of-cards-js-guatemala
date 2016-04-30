import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  game: service(),

  model() {
    return {
      userCards: this.get('game').drawCards()
    };
  }

});
