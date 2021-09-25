const Database = require('./config');

const dbStart = {
    async init(){
        const db = await Database();
        await db.exec(`
            CREATE TABLE rooms IF NOT EXISTS(
                id INTEGER PRIMARY KEY,
                pass TEXT
            )
        `);

        await db.exec(`
            CREATE TABLE questions IF NOT EXISTS(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                read INT,
                room INT
            )
        `);

        await db.close();
    }
}

dbStart.init();