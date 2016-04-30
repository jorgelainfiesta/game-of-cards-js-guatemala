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

      this.set('userCard', card);
      run.later(() => {
        this.set('botCard', botCard);
        this.set('mistery', false);
        profile.recordGame(card.power < botCard.power);

        run.later(() => {
          this.set('userCard', '');
          this.set('botCard', '');
          this.set('mistery', true);
          this.set('model.userCards', game.drawCards());
        }, 2000);

      }, Math.random() * 2000);
    }
  }
});
