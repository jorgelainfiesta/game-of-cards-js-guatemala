import Ember from 'ember';

const {
  computed,
  inject: { service }
} = Ember;

export default Ember.Controller.extend({
  name: '',

  mustFill: computed.empty('name'),

  profile: service(),

  actions: {
    updateName(name) {
      this.set('name', name);
    },
    createProfile(name) {
      if (this.get('mustFill')) {
        return;
      }
      const profile = this.get('profile');
      profile.register(name);

      this.transitionToRoute('match');
    }
  }
});
