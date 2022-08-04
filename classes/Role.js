const Department = require('./Department');

class Role extends Department{
    constructor(role, salary, dept) {
        super(dept);
        this.role = role;
        this.salary = salary;
    }

    getRoleId(id) {
        return this.id = id;
    }
};

module.exports = Role;