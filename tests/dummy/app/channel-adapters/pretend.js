import CS from 'ember-chan';
import Ember from 'ember';
import MockSocket from 'mock-socket';
import { task } from 'ember-concurrency';

const { guid, RSVP, run, A } = Ember;
const { Websocket } = MockSocket;

export default CS.Adapter.extend({
  socket: task(function*() { 
    const socket = new Websocket('ws://asdf:6666');

    const connectPromise = new RSVP.Promise(function(resolve) {
      socket.onopen(() => {
        resolve(socket);
      })
    });

    return yield connectPromise;
  }).drop(),

  connect: task(function* (channel, roomName) {
    const socket = yield this.get('socket').perform();
    const id = guid(channel);

    socket.send('join', {id, roomName});

    const joinPromise = new RSVP.Promise(function(resolve) {
      socket.onmessage(function(msg) {
        if (id === msg.id && roomName == msg.roomName) {
          resolve();
        } 
      })
    })
    yield joinPromise;
    return this;
  }).drop(),

  mergeOrigin() {}
});