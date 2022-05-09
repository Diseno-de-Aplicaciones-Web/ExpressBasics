export const createTaskTableSQL = `
    CREATE TABLE
        IF NOT EXISTS
        tasks (
            id INTEGER PRIMARY KEY,
            description VARCHAR(100) NOT NULL,
            done BOOLEAN DEFAULT false NOT NULL,
            user_id INTEGER NOT NULL,
            FOREIGN KEY ( user_id )
                REFERENCES users (id) 
                    ON DELETE RESTRICT
                    ON UPDATE RESTRICT
        )
`;

export const getTasksSQL = `SELECT id, description, done FROM tasks WHERE user_id = ?`;

export const addTaskSQL = `INSERT INTO tasks(description, done, user_id) VALUES (?, ?, ?)`;

export const getOneTaskByIdSQL = `SELECT id, description, done FROM tasks WHERE id = ? AND user_id = ?`;

export const updateTaskSQL = `UPDATE tasks SET description = ?, done = ? WHERE id = ? AND user_id = ?`;

export const deleteTaskSQL = `DELETE FROM tasks WHERE id = ? AND user_id = ?`;