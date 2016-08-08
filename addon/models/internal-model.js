import Ember from 'ember';

export default Ember.Object.extend({
  init() {
    this._attributes = {};
    this._revisions = {};
  }
})