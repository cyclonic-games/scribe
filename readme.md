# scribe
Documentation manager for vorge &amp; vorge compatible libraries/projects


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
    
    docs.explain('Proxies', `
        // markdown here
    `);
});
```

```javascript
const Documentation = require('scibe/core/Documentation');

const Game = require('vorge/core/Game');
const Module = require('vorge/core/Module');
const Connection = require('vorge/modules/Connection');

module.exports = Documentation.for(Connection, docs => {
    docs.meta({ 
        module: 'vorge/modules/Component', 
        extends: Module 
    });
    
    docs.method('establish', [ 'host' ], method => {
        method.arguments.host = String;
        method.returns = undefined;
        method.explanation = `
            // markdown here
        `;
    });
});
```
