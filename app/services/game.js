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
  },

  drawCards() {
    let cards = [
      this._drawRandomCard(this.get('weakCards')),
      this._drawRandomCard(this.get('midCards')),
      this._drawRandomCard(this.get('strongCards')),
    ];
    cards = this._shuffleDeck(cards);
    return cards;
  },
  drawCard() {
    return this._drawRandomCard(this.get('_allCards'));
  },

  _shuffleDeck(deck) {
    let i, j, temp = 0;

    for (i = deck.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }

    return deck;
  },

  _drawRandomCard(deck) {
    const randomIndex = Math.round(Math.random() * (deck.length - 1));
    return deck[randomIndex];
  }
});
