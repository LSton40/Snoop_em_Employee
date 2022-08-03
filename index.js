//References packages and associated files
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const cTable = require('console.table');
const db = require('./db/connection');
// const Employee = require('../team_profile_generator_chal/lib/Employee');

// const viewDepartments = require('./src/view_departments');
// const viewRoles = require('./src/view_roles');
// const viewEmployees = require('./src/view_employees');
// const addDepartment = require('./src/add_department');

const Department = require('./classes/department_obj');
const connection = require('./db/connection');


const selDept = `SELECT
id AS 'ID',
department_name AS 'Department'
FROM department_table
`;


function viewDepartments() {
    
    db.query(selDept, (err, departments) => {
        if (err) return console.log(err);

        console.table(departments);
        return initialPrompt();
    })
}


function addDepartment() {
    return inquirer.prompt(addDeptPrompt)

    .then((dInput) => {

        let new_dept = new Department(dInput.add_department);

        db.query(`INSERT INTO department_table (department_name) VALUES (?)`, new_dept.dept_name, (err, data) => {
            if (err) return console.log(err);
    
            new_dept.getId(data.insertId);

            console.log(`${new_dept.dept_name} department successfully added`);
            return initialPrompt();
        })
        return;
    })
};

const empls = `SELECT
    e.id AS 'ID',
    e.first_name AS 'First Name',
    e.last_name AS 'Last Name',
    employee_role.title AS 'Job Title',
    CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
    FROM employee e
        LEFT JOIN employee m 
            ON m.id = e.manager_id
        LEFT JOIN employee_role
            ON employee_role.id = e.role_id
`;

function viewEmployees() {

    db.query(empls, (err, employees) => {
        if (err) return console.log(err);

        console.table(employees);
        return initialPrompt();
    })
};

const selRole = `SELECT
    employee_role.id AS 'ID',
    employee_role.title AS 'Job Title',
    employee_role.salary AS 'Salary',
    department_table.department_name AS 'Department'
    FROM employee_role
        LEFT JOIN department_table
        ON employee_role.department_id = department_table.id
`;

function viewRoles() {

    db.query(selRole, (err, roles) => {
        if (err) return console.log(err);

        console.table(roles);
        return initialPrompt();
    })
}


const selectPrompt = {
    type: 'list',
    name: 'browse_options',
    message: 'What would you like to do?',
    choices: ['View all departments', 'Add a department', 'View all roles', 'Add a role', 'View all employees', 'Add an employee', 'Update an employee role', 'View other options', 'End'],
};

const addDeptPrompt = {
    type: 'input',
    name: 'add_department',
    message: "What is the name of the new department?"
};







class Role extends Department{
    constructor(role, salary, dept) {
        super(dept);
        this.role = role;
        this.salary = salary;
    }

    getRoleId(id) {
        return this.id = id;
    }
}

const roleSet = `
    INSERT INTO employee_role
        SET title = ?, salary = ?, department_id = ?
    `;

function addRole() {

    return new Promise((res, rej) => {
    
        db.query(`SELECT department_name FROM department_table`, (err, data) => {
            if (err) {rej (err)};
    
            res(data.map(dept => dept.department_name));
        })
        

    }
    )
    
    .then((data) => {

        const addRolePrompt = [
            {
                type: 'input',
                name: 'role',
                message: "What is the name of the new job role?"
            },
            {
                type: 'input',
                name: 'role_salary',
                message: "What is the base salary of the new role?"
            },
            {
                type: 'list',
                name: 'role_dept',
                message: "Under which department does the role fall?",
                choices: data
            }
        ]

        return inquirer.prompt(addRolePrompt)})

    .then((rInput) => {

        let new_role = new Role(rInput.role, rInput.role_salary, rInput.role_dept);

        db.query(`SELECT id FROM department_table WHERE department_name = ?`, new_role.dept_name, (err, dept_num) => {
                    if (err) return console.log(err);
        

            db.query(roleSet, [new_role.role, new_role.salary, dept_num[0].id], (err, fin_data) => {
                if (err) return console.log(err);
        
                new_role.getRoleId(fin_data.insertId);
                console.log(`${new_role.role} job title successfully added`);
                return initialPrompt();
            })
            return;
        })
        return;
    })
};




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


const managerSelect = `
    SELECT 
    CONCAT(first_name, ' ', last_name) AS 'managers'
    FROM employee
    `;

    const emplSet = `
    INSERT INTO employee
            SET
            first_name = ?,
            last_name = ?,
            role_id = ?,
            manager_id = ?
            `;


function addEmployee() {

    let roleArray;
    let managerArray;
    return new Promise((res, rej) => {


        db.query(`SELECT title FROM employee_role`, (err, role_data) => {
            if (err) return console.log(err);

            res(role_data.map(role => role.title))

        })


    })
    .then((data) => {

        roleArray = data;

        new Promise ((res, rej) => {

        db.query(managerSelect, (err, manager_data) => {
            if (err) return console.log(err);

            res(manager_data.map(managers => managers.managers));
            
        })

    })

    .then((data) => {

        managerArray = data;

const addEmplPrompt = [
    {
        type: 'input',
        name: 'empl_firstname',
        message: "What is the new employee's first name?"
    },
    {
        type: 'input',
        name: 'empl_lastname',
        message: "What is the new employee's last name?"
    },
    {
        type: 'list',
        name: 'empl_role',
        message: "What is the new employee's role?",
        choices: roleArray
    },
    {
        type: 'list',
        name: 'empl_manager',
        message: "Who is the new employee's manager?",
        choices: managerArray
    },
];

    return inquirer.prompt(addEmplPrompt)})

    .then((eInput) => {

        let new_empl = new Employee(eInput.empl_firstname, eInput.empl_lastname, eInput.empl_role, eInput.empl_manager);

        db.query(`SELECT id FROM employee_role WHERE title = ?`, new_empl.role, (err, role_num) => {
                    if (err) return console.log(err);
        
            db.query(`SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?`, new_empl.manager, (err, mgr_num) => {
                if (err) return console.log(err);
            

                db.query(emplSet, [new_empl.first_name, new_empl.last_name, role_num[0].id, mgr_num[0].id ], (err, fin_data) => {
                    if (err) return console.log(err);
            
                    new_empl.getEmplId(fin_data.insertId);
                    console.log(`${new_empl.first_name} ${new_empl.last_name} successfully hired`);
                    return initialPrompt();
                })
            return;
        })
        return;
    })
    return;
})
    })

}






// `SELECT er.id,
//     CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
// FROM employee_role er
// FROM employee e
//     LEFT JOIN employee m 
//     ON m.id = e.manager_id`


// `FROM employee e
//         LEFT JOIN employee m 
//             ON m.id = e.manager_id
//         LEFT JOIN employee_role
//             ON employee_role.id = e.role_id`

//             `SELECT id FROM employee_role WHERE title = ?`


//            ` employee_role.title AS 'Job Title',
//             CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
//             FROM employee e
//                 LEFT JOIN employee m 
//                     ON m.id = e.manager_id
//                 LEFT JOIN employee_role
//                     ON employee_role.id = e.role_id
//         `;






function updateEmployee() {

    let emplList;
    let roleList;

    return new Promise((res, rej) => {

        db.query(`SELECT CONCAT(first_name, ' ', last_name) AS 'fullname' FROM employee`, (err, empl_list) => {
            if (err) return console.log(err);

            res(empl_list.map(empls => empls.fullname))


        })
    })
    .then((data) => {
        emplList = data;

        return new Promise ((res, rej) => {

            db.query(`SELECT title FROM employee_role`, (err, role_list) => {
                if (err) return console.log(err);
    
                console.log(role_list);
                res(role_list.map(roles => roles.title));
                
            })
    
        })

    })


    .then((data) => {

        roleList = data;

        console.log(emplList);
        console.log(roleList);

    const updateEmplPrompt = [
        {
            type: 'list',
            name: 'empl_update',
            message: "Which employee's role would you like to update?",
            choices: emplList
        },
        {
            type: 'list',
            name: 'empl_role',
            message: "What role would you like to assign to the selected employee?",
            choices: roleList
        }
    ]



    return inquirer.prompt(updateEmplPrompt)

    .then((data) => {

        console.log(data);

        db.query(`SELECT id FROM employee_role WHERE title = ?`, data.empl_role, (err, role_num) => {
            if (err) return console.log(err);


            db.query(`UPDATE employee SET role_id = ? WHERE CONCAT(first_name, ' ', last_name) = ?`, [role_num[0].id, data.empl_update], (err, revision) => {
                if (err) return console.log(err);


                console.log(`${data.empl_update}'s job title successfully updated`);
                return initialPrompt();

            })
            return;
        })
        return;
    })

})

}


function leaveSession() {

    console.log('Goodbye!');
    return;
}



function initialPrompt() {

    return inquirer.prompt(selectPrompt)

    .then((select) => {
        switch(select.browse_options) {
            case 'View all departments':
                return viewDepartments();
            case 'Add a department':
                return addDepartment();
            case 'View all roles':
                return viewRoles();
            case 'Add a role':
                return addRole();
            case 'View all employees':
                return viewEmployees();
            case 'Add an employee':
                return addEmployee();
            case 'Update an employee role':
                return updateEmployee();
            case 'View other options':
                return otherPrompt();
            default:
                return leaveSession();
        }
    })
};



const emplByMgr = `
    SELECT 
        CONCAT(m.first_name, ' ', m.last_name) AS 'Manager',
        CONCAT(e.first_name, ' ', e.last_name) AS 'Employee'
        FROM employee e
            LEFT JOIN employee m
            ON e.manager_id = m.id
            GROUP BY manager_id
        `;

function viewEmplMgr() {

    db.query(emplByMgr, (err, empls_mgrs) => {
        if (err) return console.log(err);

        console.table(empls_mgrs)
        return otherPrompt();
    })
};


const emplByDept = `
    SELECT 
        d.department_name AS 'Department',
        CONCAT(e.first_name, ' ', e.last_name) AS 'Employee'
        FROM department_table d
            LEFT JOIN employee_role r
                ON r.department_id = d.id
            LEFT JOIN employee e
                ON e.role_id = r.id
        GROUP BY d.department_id
        `;

function viewEmplDept() {

    db.query(emplByDept, (err, empls_depts) => {
        if (err) return console.log(err);

        console.table(empls_depts)
        return otherPrompt();
    });
};


const deptBudg = `
    SELECT
    d.department_name AS 'Department',
    SUM(r.salary) AS 'Utilized Department Budget'
    FROM department_table d
        LEFT JOIN employee_role r
            ON r.department_id = d.id
        LEFT JOIN employee e
            ON e.role_id = r.id
        GROUP BY e.id
    `;

function viewDeptBudget() {
    db.query(deptBudg, (err, budgets) => {
        if (err) return console.log(err);

        console.table(budgets)
        return otherPrompt();
    });
}





function deleteDept() {

    return new Promise((res, rej) => {

        db.query(`SELECT department_name FROM department_table`, (err, depts) => {
            if (err) return console.log(err);
    
            res(depts.map(dept => dept.department_name))
        })


    })
    .then((dept_list) => {

    const delDeptPrompt = {
        type: 'list',
        name: 'del_department',
        message: "Which department do you want to delete?",
        choices: dept_list
    };

    return inquirer.prompt(delDeptPrompt)

    .then((dept_sel) => {

        db.query(`SELECT id FROM department_table WHERE department_name = ?`, dept_sel, (err, dept_id) => {
            if (err) return console.log(err);


        db.query(`DELETE FROM department_table WHERE id = ?`, dept_id, (err, del_data) => {
            if (err) return console.log(err);
    
            console.log(`${dept_sel} department successfully delete`)
            return otherPrompt();
        });

        });
    })

})

}


let employee_list;
let manager_list;


function updateManager() {

    return new Promise((res, rej) => {

        db.query(`SELECT CONCAT(first_name, ' ', last_name) AS 'fullname' FROM employee`, (err, empls) => {
            if (err) return console.log(err);
    
            res(empls.map(empl => empl.fullname))
        })

    })
    .then((empl_list) => {

        employee_list = empl_list

        new Promise ((res, rej) => {

            db.query(managerSelect, (err, new_mgr) => {
                if (err) return console.log(err);
    
                res(new_mgr.map(new_manager => new_manager.managers));
                
            })
    
        })
    



    .then((mgr_list) => {

        manager_list = mgr_list;

    const updateMgrPrompt = [{
        type: 'list',
        name: 'choose_empl_chg_mgr',
        message: "Whose manager do you wish to change?",
        choices: empl_list
    },
    {
        type: 'list',
        name: 'update_mgr',
        message: "Who will be the new manager of this employee?",
        choices: manager_list
    }
];

    return inquirer.prompt(updateMgrPrompt)

    .then((user_sels) => {

        db.query(`SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?`, user_sels[0].choose_empl_chg_mgr, (err, empl_id) => {
            if (err) return console.log(err);

            

            db.query(`SELECT id FROM employee WHERE CONCAT(m.first_name, ' ', m.last_name) = ?`, user_sels[1].update_mgr, (err, mgr_id) => {
                if (err) return console.log(err);


        db.query(`UPDATE employee SET manager_id = ? WHERE id = ?`, [mgr_id, empl_id], (err, chg_data) => {
            if (err) return console.log(err);
    
            console.log(`Successfully changed ${user_sels[0].choose_empl_chg_mgr}'s  manager to ${user_sels[1].update_mgr}!`)
            return otherPrompt();
        });

        });
    })
    })
    })

})
}


/*
Update employee managers.

View employees by manager.

View employees by department.

Delete departments, roles, and employees.

View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
*/


function deleteRole() {

    return new Promise((res, rej) => {

        db.query(`SELECT title FROM employee_role`, (err, roles) => {
            if (err) return console.log(err);
    
            res(roles.map(role => role.title))
        })


    })
    .then((role_list) => {

    const delRolePrompt = {
        type: 'list',
        name: 'del_role',
        message: "Which job position do you want to delete?",
        choices: role_list
    };

    return inquirer.prompt(delRolePrompt)

    .then((role_sel) => {

        db.query(`SELECT id FROM employee_role WHERE title = ?`, role_sel, (err, role_id) => {
            if (err) return console.log(err);


        db.query(`DELETE FROM employee_role WHERE id = ?`, role_id, (err, del_data) => {
            if (err) return console.log(err);
    
            console.log(`${role_sel} position successfully delete`)
            return otherPrompt();
        });

        });
    })

})

};


function deleteEmployee() {

    return new Promise((res, rej) => {

        db.query(`SELECT CONCAT(first_name, ' ', last_name) AS 'fullname' FROM employee`, (err, empls) => {
            if (err) return console.log(err);
    
            res(empls.map(empl => empl.fullname))
        })


    })
    .then((empl_list) => {

    const delEmplPrompt = {
        type: 'list',
        name: 'del_employee',
        message: "Which employee do you wish to terminate, you monster?",
        choices: empl_list
    };

    return inquirer.prompt(delEmplPrompt)

    .then((empl_sel) => {

        db.query(`SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?`, empl_sel, (err, empl_id) => {
            if (err) return console.log(err);


        db.query(`DELETE FROM employee WHERE id = ?`, empl_id, (err, del_data) => {
            if (err) return console.log(err);
    
            console.log(`${empl_sel} successfully terminated! Good riddance!`)
            return otherPrompt();
        });

        });
    })

})

};



const otherOptions = {
    type: 'list',
    name: 'addl_options',
    message: 'What would you like to do?',
    choices: ['Update employee managers', 'View employees by manager', 'View employees by department', 'View total department budget', 'Delete a department', 'Delete a role', 'Delete an employee', 'Return to main menu', 'End'],
};


function otherPrompt() {

    return inquirer.prompt(otherOptions)

    .then((select) => {
        switch(select.browse_options) {
            case 'Update employee managers':
                return updateManager();
            case 'View employees by manager':
                return viewEmplMgr();
            case 'View employees by department':
                return viewEmplDept();
            case 'View total department budget':
                return viewDeptBudget();
            case 'Delete a department':
                return deleteDept();
            case 'Delete a role':
                return deleteRole();
            case 'Delete an employee':
                return deleteEmployee();
            case 'Return to main menu':
                return initialPrompt();
            default:
                return leaveSession();
        }
    })
};




initialPrompt();

