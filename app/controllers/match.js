import Ember from 'ember';

const {
  inject: { service },
  run
} = Ember;

export default Ember.Controller.extend({
  mistery: true,
  userCard: null,
  botCard: null,

  profile: service(),
  game: service(),

  actions: {
    chooseCard(card) {
      const game = this.get('game');
      const profile = this.get('profile');
      const botCard = game.drawCard();

      this.set('playing', true);
      this.set('userCard', card);
      run.later(() => {
        this.set('botCard', botCard);
        this.set('mistery', false);
        profile.recordGame(card.power > botCard.power);

        run.later(() => {
          this.set('gameOver', true);
          this.set('userWon', card.power > botCard.power);

          run.later(() => {
            this.set('gameOver', false);
            this.set('playing', false);
            this.set('userCard', '');
            this.set('botCard', '');
            this.set('mistery', true);
            this.set('model.userCards', game.drawCards());
          }, 1000);
        }, 1000);

      }, Math.random() * 2000);
    }
  }
});
