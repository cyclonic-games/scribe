# scribe
Documentation manager for vorge &amp; vorge compatible libraries/projects

## Example 1
```javascript
const Documentation = require('scribe/Documentation');

const Game = require('vorge/core/Game');
const Module = require('vorge/core/Module');

module.exports = Documentation.for(Module, 'vorge/core/Module', docs => {
    docs.field('kind', String, '// markdown here');
    docs.field('game', Game, '// markdown here');
    
    docs.section('Proxies', `
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

module.exports = Documentation.for(Connection, 'vorge/modules/Component', docs => {
    docs.extends(Module);
    
    docs.method('establish', [ 'host' ], undefined, `
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
