import StorageObject from 'ember-local-storage/local/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      name: '',
      wins: 0,
      games: 0
    };
  }
});

export default Storage;
