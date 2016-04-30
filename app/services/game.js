import Ember from 'ember';

const {
  computed,
  inject: { service }
} = Ember;

export default Ember.Service.extend({
  _allCards: [],
  _weakMax: 200,
  _midMax: 300,

  allCards: computed.readOnly('_allCards'),

  weakCards: computed('_allCards.[]', {
    get() {
      const allCards = this.get('_allCards');

      return allCards.filter((card) => {
        return card.power <= this.get('_weakMax');
      });
    }
  }),
  midCards: computed('_allCards.[]', {
    get() {
      const allCards = this.get('_allCards');

      return allCards.filter((card) => {
        return card.power > this.get('_weakMax') && card.power <= this.get('_midMax');
      });
    }
  }),
  strongCards: computed('_allCards.[]', {
    get() {
      const allCards = this.get('_allCards');

      return allCards.filter((card) => {
        return card.power > this.get('_midMax');
      });
    }
  }),

  ajax: service(),

  loadCards() {
    const cardsRequest = this.get('ajax').request('cards')
    .then((cards) => {
      this.set('_allCards', cards);
    });

    return cardsRequest;
  }
});
