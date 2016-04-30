import AjaxService from 'ember-ajax/services/ajax';
import config from 'cards-game/config/environment';

export default AjaxService.extend({
  host: config.apiHost
});
