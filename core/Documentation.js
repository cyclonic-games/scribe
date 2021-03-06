const requires = new Map();

class Specification {
    
    constructor (documentation) {
        const { of, require } = documentation;
        
        this.documentation = documentation;
        this.markdown = this.documentation.outdent(`
            # ${ of.name }
            ### ${ require ? `\`const ${ of.name } = require('${ require }');\`` : '' }
        `);
    }
    
    extends (parent) {
        const { of } = this.documentation;
        const regexp = new RegExp(`^\n\s+?#\s(${ of.name })`);
        
        this.markdown = this.markdown.replace(regexp, name => `${ name } : [${ parent.name }](#${ requires.get(parent) })`);
    }
    
    field (name, type, description) {
        const { of } = this.documentation;
        const self = of.name.toLowerCase();
        
        this.markdown += this.documentation.outdent(`
            - #### *\`${ self }.${ name } -> ${ type ? type.name || type : 'void' }\`*
              ${ this.documentation.outdent(description) }
        `);
    }
    
    method (name, args, type, description) {
        const { of } = this.documentation;
        const self = of.name.toLowerCase();
        
        this.markdown += this.documentation.outdent(`
            - #### *\`${ self }.${ name }(${ args.join(', ') }) -> ${ type ? type.name || type : 'void' }\`*
              ${ this.documentation.outdent(description) }
        `);
    }
    
    section (title, content) {
        this.markdown += this.documentation.outdent(`
            ---
            ## ${ title }
            ${ this.documentation.outdent(content) }
        `);
    }
}

module.exports = class Documentation {
    
    constructor (of, require, definition) {
        this.of = of;
        this.require = require;
        this.definition = definition;
        
        requires.set(of, require);
    }
    
    outdent (markdown) {
        const [ , indentation ] = markdown.match(/^\n(\s+?)(?=\S)/) || [ , '' ];
        const outdented = markdown.replace(new RegExp(`\n${ indentation }`, 'g'), '\n');
        
        return outdented;
    }
    
    generate () {
        const specification = new Specification(this);
        
        this.definition(specification);
        
        return this.outdent(specification.markdown);
    }
};
