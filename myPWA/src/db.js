// Path: src/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const DB_PATH = path.resolve(process.cwd(), '.database', 'datasource.db');

export async function openDB() {
    return open({
        filename: DB_PATH,
        driver: sqlite3.Database
    });
}
