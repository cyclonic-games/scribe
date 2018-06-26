class Speficitaion {
    
    constructor (documentation) {
        const { of, require } = documentation;
        
        this.documentation = documentation;
        this.markdown = `
            # ${ of.name }
            ${ require ? `\`const ${ of.name } = require('${ require }');\`` : '' }
        `;
    }
    
    extends (parent) {
        const { of } = this.documentation;
        const regexp = new RegExp(`# (${ of.name })`);
        
        this.markdown.replace(regexp, of => `${ of } : ${ parent.name }`);
    }
    
    field (name, type, description) {
        const { of } = this.documentation;
        const self = of.name.toLowerCase();
        
        this.markdown += `
            #### \`${ type.name } ${ self }.${ name }\`
            ${ description }
        `;
    }
    
    method (name, args, type, description) {
        const { of } = this.documentation;
        const self = of.name.toLowerCase();
        
        this.markdown += `
            #### \`${ type.name } ${ self }.${ name }(${ args.join(', ') })\`
            ${ description }
        `;
    }
}

module.exports = class Documentation {
    
    constructor (of, require, specification) {
        this.of = of;
        this.require = require;
        this.specification = specification;
    }
    
    generate () {
        const specification = new Specification(this);
        
        this.specification(specification);
        
        return specification.markdown;
    }
};
