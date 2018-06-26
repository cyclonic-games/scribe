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
            - #### *\`${ self }.${ name } -> ${ type.name }\`*
              ${ this.documentation.outdent(description) }
        `);
    }
    
    method (name, args, type, description) {
        const { of } = this.documentation;
        const self = of.name.toLowerCase();
        
        this.markdown += this.documentation.outdent(`
            - #### *\`${ self }.${ name }(${ args.join(', ') }) -> ${ type.name }\`*
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
    
    constructor (of, require, specification) {
        this.of = of;
        this.require = require;
        this.specification = specification;
        
        requires.set(of, require);
    }
    
    outdent (markdown) {
        const [ , indentation ] = markdown.match(/^\n(\s+?)(?=\S)/) || [ '' ];
        const outdented = markdown.replace(new RegExp(`\n${ indentation }`, 'g'), '\n');
        
        return outdented;
    }
    
    generate () {
        const specification = new Specification(this);
        
        this.specification(specification);
        
        return this.outdent(specification.markdown);
    }
};
