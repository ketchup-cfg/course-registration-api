import waitPort from "wait-port";
import fs from "fs";
import { Client } from "pg";

const {
  POSTGRES_HOST: HOST,
  POSTGRES_HOST_FILE: HOST_FILE,
  POSTGRES_USER: USER,
  POSTGRES_USER_FILE: USER_FILE,
  POSTGRES_PASSWORD: PASSWORD,
  POSTGRES_PASSWORD_FILE: PASSWORD_FILE,
  POSTGRES_DB: DB,
  POSTGRES_DB_FILE: DB_FILE,
} = process.env;

let client: Client;

async function getDbConfig() {
  const host = HOST_FILE
    ? fs.readFileSync(HOST_FILE, { encoding: "utf8" })
    : HOST;
  const user = USER_FILE
    ? fs.readFileSync(USER_FILE, { encoding: "utf8" })
    : USER;
  const password = PASSWORD_FILE
    ? fs.readFileSync(PASSWORD_FILE, { encoding: "utf8" })
    : PASSWORD;
  const database = DB_FILE
    ? fs.readFileSync(DB_FILE, { encoding: "utf8" })
    : DB;

  return {
    host,
    user,
    password,
    database,
  };
}

async function init() {
  const { host, user, password, database } = await getDbConfig();

  await waitPort({
    host,
    port: 5432,
    timeout: 10000,
    waitForDns: true,
  });

  client = new Client({
    host,
    user,
    password,
    database,
  });

  return client
    .connect()
    .then(async () => {
      console.log(`Connected to postgres database at host ${host}`);

      await setupTables();

      console.log("Configured database tables");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
}

async function setupTables() {
  await createCoursesTable();
}

async function createCoursesTable() {
  await client.query(
    `CREATE TABLE IF NOT EXISTS courses (
       id            bigint GENERATED ALWAYS AS IDENTITY,
       course_number text   NOT NULL,
       subject_code  text   NOT NULL,
       description   text
     )`
  );
}

// End the connection
async function teardown() {
  return client
    .end()
    .then(() => {
      console.log("Client ended");
    })
    .catch((err) => {
      console.error("Unable to end client:", err);
    });
}

const db = {
  init,
  teardown,
};

export default db;
