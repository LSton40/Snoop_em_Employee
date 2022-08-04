const Role = require('../classes/Role');

class Employee extends Role{
    constructor(first_name, last_name, role, manager) {
        super(role);
        this.first_name = first_name;
        this.last_name = last_name;
        this.manager = manager;
    }

    getEmplId(id) {
        return this.id = id;
    }
};

module.exports = Employee;