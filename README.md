# Snoop_em_Employee
by Logan Sutton

## Description

This is a command-line app to view and edit the employment structure of a business.

Upon initializing, the user is presented with a prompt to view the existing departments, employment roles, and individual employees of the business, to add a new department, role, or employee, or to update a selected employee's job role. 

The department view presents the user with only the itemized existing departments; the role view shows the title of the role, the salary associated with that role, and the department under which it falls; the employee view shows the employee's first and last names, the job role they inhabit, and their direct manager, if any.

Adding a new department allows the user to give a name to a newly created department. The add role function allows the user to give a title to the role, assign a salary amount, and select which department the role falls under. The add employee function allows the user to type in the first and last name of the added employee, to select the (existing) role to which they will be assigned, and to select who their manager will be among the existing employees. The option to update an employee allows the user to change the employee's job role, selecting among the existing set of roles.

There main prompt contains an additional options menu to view employees by their assigned department, presenting a full list of employees with their corresponding department. Or, the user may view employees by their assigned manager, where one exists. Also, they may view the total operating cost of a given department (the sum of all existing salaries within that department). The additional menu also presents the option to update the assigned manager of a selected employee, selecting among the full list of business employees. Finally, the user may delete an employee, role, or department from the database. If an employee who is to be deleted is another employee's manager, that second employee's manager assignment will be nullified until it can be separately updated. The employee is otherwise completely removed from the database. Deleting a role will similarly nullify the role assignment of any employee who is assigned to that role--allowing that the employee may be separately reassigned a new role (if they are not simply terminated). Likewise, deleting a department will nullify the department assignment of a given role, allowing the role to be merged into another department, assuming it is not (separately) eliminated.

The user may exit the app from the prompt by selecting `End` from the main or additional prompt menu. Or, the user may type Control + C to exit a prompt, and the app, at any time.


Link to video walkthrough: [Snoop'em Employee video walkthrough](https://drive.google.com/file/d/1NqT4c1VRUzdty_KhTiURtGTpZnqNQbgk/view)

## Table of Contents  

- [Installation](#installation)  
- [Usage](#usage)  
- [License](#license)  
- [How to Contribute](#how-to-contribute)  
- [Tests](#tests)  
- [Questions](#questions)  

## Installation

In development, this app is written using Node.js, MySQL, with the MySQL2 package, and Inquirer NPM.

## Usage

Basic functionality of the app is described in the Description section above. This is a training assignment on back-end development and no usage is intended beyond the stated app function.

## License

All Rights Reserved. No license is assigned to this project.

Copyright (c) 2022 Logan Sutton.  

## How to Contribute
  
This app was created as a graded class challenge. No contribution is requested at present.  

## Tests

No tests are currently deployed for this app.

## Questions

[LSton40 GitHub](https://github.com/LSton40)  

If you have any questions, please contact me at logan.sutton@gmail.com.
