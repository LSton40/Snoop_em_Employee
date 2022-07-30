
function viewDepartments() {

    initialPrompt();
}

function viewRoles() {

    initialPrompt();
}

function viewEmployees() {
    
    initialPrompt();
}



function addDepartment() {
    return inquirer.prompt(addDeptPrompt)

    .then((dInput) => {

        let new_dept = new addDepartment(dInput.add_department);


        return FUNCTION();
    })
    .then(() => {
        initialPrompt();
    })
}

function addRole(addRolePrompt) {
    return inquirer.prompt()

    .then((rInput) => {

        let new_role = new addRole(rInput.role, rInput.role_salary, rInput.role_dept);
      
        return FUNCTION();
    })

    .then(() => {
        initialPrompt();
    })

}

function addEmployee() {
    return inquirer.prompt(addEmplPrompt)

    .then((eInput) => {
        
        let new_empl = new Employee(eInput.empl_firstname, eInput.empl_lastname, eInput.empl_role, eInput.empl_manager);

        return FUNCTION();
    })

    .then(() => {
        initialPrompt();
    })
}


function updateEmployee() {
    return inquirer.prompt()

    .then(() => {

        return FUNCTION();
    })

}