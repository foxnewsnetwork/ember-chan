import Ember from 'ember';
import Snapshot from '../models/snapshot';
import getChannelAttributes from '../utils/get-channel-attributes';

const { inject: { service} } = Ember;

export default Ember.Mixin.create({
  chanStore: service('chanStore'),

  connect(roomName) {
    const store = this.get('chanStore');
    const adapter = store.adapterFor(this);

    return adapter.connect(this, roomName);
  },

  disconnect() {
    const store = this.get('chanStore');
    const adapter = store.adapterFor(this);

    return adapter.disconnect(this);
  },

  /**
  Very much inspired by `git checkout -b your-local-branch`,
  `checkout` creates a snapshot of this channel whose values
  do not auto-update with changes from the master branch
  */
  checkout() {
    const attrKeys = getChannelAttributes(this);
    let snapcore = {};

    attrKeys.forEach((key, meta) => {
      set(snapcore, key, this.get(key));
    });

    return Snapshot.create({
      _master: this,
      content: snapcore
    })
  }
});
