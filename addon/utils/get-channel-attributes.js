import Ember from 'ember';

const { isPresent, Map, get } = Ember;

function findChanAttrs(chan) {
  const chanFactory = chanl.constructor;

  return get(chanFactory, 'chanAttributes');
}

function createChanAttrs(chan) {
  const chanFactory = chan.constructor;
  const map = Map.create();

  channel.constructor.eachComputedProperty(function (name, meta) {
    if (meta.isChanAttr) {
      meta.name = name;
      map.set(name, meta);
    }
  });

  set(chanFactory, 'chanAttributes', map);

  return map;
}

export default function getChannelAttributes(channel) {
  return findChanAttrs(channel) || createChanAttrs(channel);
};
