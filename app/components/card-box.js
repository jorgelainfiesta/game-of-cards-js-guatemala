import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['panel'],
  click() {
    this.sendAction('onClick');
  }
});
