USE employee_roster;

INSERT INTO department_table (department_name) VALUES 
    ('Editing'), 
    ('Publishing'), 
    ('Design'), 
    ('Sales'), 
    ('Writing'),
    ('Administration');

INSERT INTO employee_role (title, salary, department_id) VALUES 
    ('Chief Editor', 80000, 1), 
    ('Lead Publisher', 60000, 2), 
    ('Lead Designer', 80000, 3), 
    ('Lead Sales Representative', 80000, 4), 
    ('Head Writer', 80000, 5),
    ('CEO', 120000, 6),
    ('Administrative Assistant', 60000, 6),
    ('General Assistant', 40000, 6),
    ('Editing Assistant', 45000, 1),
    ('Publishing Assistant', 45000, 2),
    ('Design Assistant', 45000, 3),
    ('Sales Assistant', 45000, 4),
    ('Writing Assistant', 45000, 5),
    ('Editor', 53000, 1),
    ('Writer', 53000, 5),
    ('Sales Representative', 53000, 4),
    ('Designer', 53000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
    ('Willy', 'Nilson', 1), 
    ("Len", "O'Riordan", 2), 
    ("Allie", "Surtdottir", 3), 
    ("Mbele", "Nkoye", 4), 
    ("Chelsea", "Oliphant", 5),
    ("Gary", "Sheldon", 6),
    ("Laurent", "Aussi", 7, 6),
    ("Geddy", "Lee", 8, 6),
    ("Ruth", "Robinson", 9, 1),
    ("Dan", "Upton", 10, 2),
    ("Yuri", "Gregorovich", 11, 3),
    ("Yelena", "Oz", 12, 4),
    ("Ozymandias", "White", 13, 5),
    ("Aurora", "Elson", 14, 1),
    ("Maynard", "Reznor", 15, 3),
    ("Sunny", "Buono", 16, 4),
    ("Mipa", "Nanarosh", 17, 5),
    ("Alison", "Rhodes", 8, 6),
    ("Sarah", "Lee", 8, 6),
    ("Iggy", "Rôcher", 15, 3),
    ("Velma", "Daphne", 15, 3),
    ("Ichabod", "Byrd", 14, 1),
    ("Percival", "Watkins", 17, 5);
