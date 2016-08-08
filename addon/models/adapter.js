import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Object.extend({
  /**
  Adds the current user to the channel
  */
  connect(channel, roomName) { 

  },

  disconnect(channel) { 

  },

  /**
  Pushes the snapshot upstream and issues a pull request
  to everyone listening
  */
  pushOrigin(chan, snap) {

  },

  /**
  Upstream wants us to merge the snapshot into the master
  channel. A merge can happen automatically if and only if
  the snapshot is ahead of the master 
  */
  onPullRequest(chan, snap) {

  }
});