export const createUserTableSQL = `
    CREATE TABLE
        IF NOT EXISTS
        users(
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            password TEXT NOT NULL
        )
`;

export const addUserSQL = `INSERT INTO users(name, password) VALUES (?, ?)`;

export const authenticateUserSQL = `SELECT 1 FROM users WHERE name=? AND password=?`;