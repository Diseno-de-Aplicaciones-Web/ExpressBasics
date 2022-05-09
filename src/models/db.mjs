import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err) {
        throw err.message;
    }
    console.log('Connected to database.');
});

import { createUserTableSQL } from "./usersModels.mjs";
import { createTaskTableSQL } from "./tasksModels.mjs"

db.run(createUserTableSQL);
db.run(createTaskTableSQL);