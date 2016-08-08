import Ember from 'ember';
import ChannelMixin from 'ember-chan/mixins/channel';
import { module, test } from 'qunit';

module('Unit | Mixin | channel');

// Replace this with your real tests.
test('it works', function(assert) {
  let ChannelObject = Ember.Object.extend(ChannelMixin);
  let subject = ChannelObject.create();
  assert.ok(subject);
});
