import Ember from 'ember';

const { computed, set, get, typeOf } = Ember;

function hasValue(internalModel, key) {
  return key in internalModel;
}

function getDefaultValue(record, options, key) {
  if (typeOf(options.defaultValue) === 'function') {
    return options.defaultValue.apply(null, arguments);
  } else {
    return get(options, 'defaultValue');
  }
}

export function attr (type, opts={}) {
  const meta = {
    isLiveAttr: true,
    type: type,
    options: opts
  }
  return computed({
    get(key) {
      const internalModel = this._internalModel;
      if (hasValue(internalModel, key)) {
        return get(internalModel, key);
      } else {
        return getDefaultValue(internalModel, opts, key);
      }
    },
    set(key, value) {
      const internalModel = this._internalModel;
      this.notifyPropertyChange(key);
      set(internalModel, key, value);
    }
  }).meta(meta);
}
