import Ember from 'ember';

export default Ember.ObjectProxy.extend({
  /**
  The reference back to the whatever created this snapshot
  */
  _master: null,

  /**
  Committing increments hash for all the fields where you made changes
  After you commit, you should mergeOrigin
  */
  commit() {

  },

  mergeOrigin() {

  }
})