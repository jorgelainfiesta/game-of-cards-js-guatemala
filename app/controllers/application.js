import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Controller.extend({
  profile: service(),

  actions: {
    exitProfile(event) {
      event.preventDefault();
      this.get('profile').reset();
      this.transitionToRoute('index');
    }
  }
});
