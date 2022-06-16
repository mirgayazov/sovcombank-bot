import pgPromise from "pg-promise";
import * as dotenv from "dotenv";

dotenv.config({path: '../.env'});

const pgp = pgPromise({});
const db = pgp(`postgres://postgres:${process.env.PG_PASSWORD}@localhost:5432/`);
const dbName = process.env.DB_NAME;

db.connect()
    .then(async () => {
        try {
            await db.any(`create database ${dbName}`)
            console.log(`database with name: ${dbName} - created.`)
            pgp.end()
        } catch (e) {
            await db.any(`drop database ${dbName}`)
            console.log(`database with name: ${dbName} - deleted.`)
            pgp.end()
        }
    })
    .catch(err => {
        console.log(err);
    });
