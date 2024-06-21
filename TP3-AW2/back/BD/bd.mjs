import pg from 'pg'
import dotenv from 'dotenv'
const {Pool} = pg
import 'dotenv/config'

dotenv.config()

const DB_PORT = process.env.DB_PORT || 3000
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE

const pool = new Pool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
})

export {pool}



