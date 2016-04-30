import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('create-user');
  this.route('cards');
  this.route('match');
  this.route('profile');
});

export default Router;
