# scribe
Documentation manager for vorge &amp; vorge compatible libraries/projects

## Example 1
```javascript
const Documentation = require('scribe/Documentation');

const Game = require('vorge/core/Game');
const Module = require('vorge/core/Module');

module.exports = new Documentation(Module, 'vorge/core/Module', spec => {
    spec.field('kind', String, '// markdown here');
    spec.field('game', Game, '// markdown here');
    
    spec.section('Proxies', `
        // markdown here
    `);
});
```

#### Output
```markdown
# Module
`const Module = require('vorge/core/Module');`

#### `String module.kind`
// markdown here

#### `Game module.game`
// markdown here
    
## Proxies
// markdown here
```

## Example 2
```javascript
const Documentation = require('scribe/Documentation');

const Module = require('vorge/core/Module');
const Connection = require('vorge/modules/Connection');

module.exports = new Documentation(Connection, 'vorge/modules/Component', spec => {
    spec.extends(Module);
    
    spec.method('establish', [ 'host' ], undefined, `
        // markdown here
    `);
});
```

#### Output
```markdown
# Connection : Module
`const Connection = require('vorge/modules/Connection');`
    
#### void module.establish(host)
// markdown here
```

```markdown
# Array : [Object](#undefined)
`const Array = require('foo/Array');`

### Example
```javascript
const array = new Array();
```

### Properties
##### *`String array.foo`*
returns the foo as a string

##### *`Number array.bar`*
returns the bar as a number

### Methods
Here are some methods

##### *`Number array.baz(x, y)`*
accepts X & Y, and returns their sum
```
