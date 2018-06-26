# scribe
Documentation manager for vorge &amp; vorge compatible libraries/projects

## Example 1
```javascript
const Documentation = require('scibe/core/Documentation');

const Game = require('vorge/core/Game');
const Module = require('vorge/core/Module');

module.exports = Documentation.for(Module, docs => {
    docs.meta({ 
        module: 'vorge/core/Module' 
    });
    
    docs.field('kind', String);
    docs.field('game', Game);
    
    docs.info('Proxies', `
        // markdown here
    `);
});
```

#### Output
```markdown
# Module
*const Module = require('vorge/core/Module');*

### String module.kind
### Game module.game
    
## Proxies
// markdown here
```

## Example 2
```javascript
const Documentation = require('scibe/core/Documentation');

const Module = require('vorge/core/Module');
const Connection = require('vorge/modules/Connection');

module.exports = Documentation.for(Connection, docs => {
    docs.meta({ 
        module: 'vorge/modules/Component', 
        extends: Module 
    });
    
    docs.method('establish', [ 'host' ], undefined, `
        // markdown here
    `);
});
```

#### Output
```markdown
# Module
*const Connection = require('vorge/modules/Connection');*
    
## Meta
Connection inherits from Module
    
### void module.establish(host)
// markdown here
```
