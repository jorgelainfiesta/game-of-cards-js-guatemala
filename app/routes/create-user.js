import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  profile: service(),

  beforeModel() {
    if (this.get('profile.authenticated')) {
      this.transitionTo('match');
    }
    return this._super(...arguments);
  }
});
