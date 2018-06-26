class Speficitaion {
    
}

module.exports = class Documentation {
    
    constructor (of, require, specification) {
        this.of = of;
        this.require = require;
        this.specification = specification;
    }
    
    generate () {
        return this.specification(new Specification(this));
    }
};
