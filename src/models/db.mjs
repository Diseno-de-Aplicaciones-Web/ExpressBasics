import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err) {
        throw err.message;
    }
    console.log('Connected to database.');
});

db.run(`
    CREATE TABLE
        IF NOT EXISTS
        users(
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            password TEXT NOT NULL
        )
`);

db.run(`
    CREATE TABLE
        IF NOT EXISTS
        tasks (
            id INTEGER PRIMARY KEY,
            description VARCHAR(100) NOT NULL,
            done BOOLEAN DEFAULT false NOT NULL
        )
`);

/*
db.run(`
    CREATE TABLE
        IF NOT EXISTS
        tasks (
            id INTEGER PRIMARY KEY,
            description VARCHAR(100) NOT NULL,
            done BOOLEAN DEFAULT false NOT NULL,
            id_user INTEGER NOT NULL,
            FOREIGN KEY ( id_user )
                REFERENCES users (id) 
                    ON DELETE CASCADE 
                    ON UPDATE CASCADE
        )
`);
*/