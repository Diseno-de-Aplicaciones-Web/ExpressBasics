export const createTaskTableSQL = `
    CREATE TABLE
        IF NOT EXISTS
        tasks (
            id INTEGER PRIMARY KEY,
            description VARCHAR(100) NOT NULL,
            done BOOLEAN DEFAULT false NOT NULL
            id_user INTEGER NOT NULL,
            FOREIGN KEY ( id_user )
                REFERENCES users (id) 
                    ON DELETE RESTRICT
                    ON UPDATE RESTRICT
        )
`;

export const getTasksSQL = `SELECT id, description, done FROM tasks`;

export const addTaskSQL = `INSERT INTO tasks(description, done) VALUES (?, ?)`;