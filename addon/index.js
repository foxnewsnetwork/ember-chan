import Channel from './mixins/channel';
import Adapter from './models/adapter';
import { createInjectionHelper } from 'ember-runtime/inject';

const inject = {
  channel: createInjectionHelper('channel')
};

export default {
  inject,
  Channel,
  attr,
  hasMany,
  Adapter
};