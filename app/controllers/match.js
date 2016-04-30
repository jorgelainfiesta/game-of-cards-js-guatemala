import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Controller.extend({
  mistery: true,

  profile: service()
});
