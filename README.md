# Ember-chan

Sets forth a framework for managing live-updated singleton channels

## Usage
Here's an example:

`app/channels/dashboard.js`
```javascript
import Ember from 'ember';
import CS from 'ember-chan';

const { Channel, attr, hasMany } = CS;

export default Ember.Service.extend(Channel, {
  users: hasMany('user'),
  topic: attr('string'),
  messages: hasMany('message')
});
```

`app/channel-adapters/dashboard.js`
```javascript
import CS from 'ember-chan';
import { task } from 'ember-concurrency';

export default CS.Adapter.extend({
  connect: task(...),

  disconnect: task(...),

  checkout: K,

  commit: K,

  mergeOrigin: K,

  onPullRequest: K,

  resolveConflict: K
})
```

`app/routes/dashboard.js`
```javascript
import Ember from 'ember';
import CS from 'ember-chan';

const { inject: { channel } } = CS;

export default Ember.Route.extend({
  dashboard: channel('dashboard', 'main'),

  beforeModel() {
    return this.get('dashboard').connect();
  },

  model() {
    return this.get('dashboard').checkoutSnapshot()
  }

  deactivate: Ember.on('deactivate', function() {
    this.get('dashboard').disconnect();
  })
});
```

`app/controllers/dashboard.js`
```javascript
import Ember from 'ember';
import CS from 'ember-chan';

const { computed: { alias } } = Ember;
const { inject: { channel } } = CS;

export default Ember.Controller.extend({
  snapshot: alias('model'),
  dashboard: channel('dashboard', 'main'),
  actions: {
    commit() {
      this.get('snapshot').commit().mergeOrigin();
    }
  }
});
```

`app/templates/dashboard.hbs`
```handlebars
<div class='users'>
  {{#each dashboard.users as |user|}}
    {{show-user model=user}}
  {{/each}}
</div>
<div class="chat">
  {{#if editMode}}
    <h1>{{dashboard.topic}}</h1>
  {{else}}
    {{input value=snapshot.topic action=(action (mut snapshot.topic)) enter='commit'}}
  {{/if}}
  {{#each dashboard.messages as |message|}}
    {{show-message model=message}}
  {{/each}}
</div>
```
## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
