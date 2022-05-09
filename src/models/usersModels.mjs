export const createUserTableSQL = `
    CREATE TABLE
        IF NOT EXISTS
        users(
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            password TEXT NOT NULL
        )
`;

export const authenticateUserSQL = `SELECT 1 FROM users WHERE name=? AND password=?`;