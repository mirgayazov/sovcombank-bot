import pgPromise from "pg-promise";
import * as dotenv from "dotenv";

const createScript = ``;

dotenv.config({path: '../.env'});

const pgp = pgPromise({});
let db = pgp(`postgres://postgres:${process.env.PG_PASSWORD}@localhost:5432/${process.env.DB_NAME}`);

db.connect()
    .then(async () => {
        try {
            await db.any(createScript)
            console.log('database initialized')
            pgp.end()
        } catch (e) {
            console.log(e)
            pgp.end()
        }
    })
    .catch(err => {
        console.log(err);
    });
