//Required Dependencies: Knex, dotenv
import knex from "knex";
import path from "path";
import 'dotenv/config';

const DB_CONNECTION = process?.env?.DB_CONNECTION;
const DB_HOST = process?.env?.DB_HOST;
const DB_PORT = process?.env?.DB_PORT;
const DB_DATABASE = process?.env?.DB_DATABASE;
const DB_USERNAME = process?.env?.DB_USERNAME;
const DB_PASSWORD = process?.env?.DB_PASSWORD; 
const DB_FILENAME = path.resolve(process?.env?.DB_FILENAME ?? "");

/** Knex Specification
 * @client stands for what kind of database
 *      list: 
 *          pg - PostgreSQL
 *          sqlite - SQLite3
 *          mysql - MySQL
 */
const generateDBConfig = (()=>{
    const config = {};
    config.client = DB_CONNECTION;
    config.connection = {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USERNAME,
        database: DB_DATABASE,
        password: DB_PASSWORD,
        filename: DB_FILENAME,
    };
    config.useNullAsDefault = true;
    return config;
})();


export const db = knex(generateDBConfig())


export class TableCreation{
    constructor(name){
        this.name = name;
        this.column = [];
    }
    addColumn(callback){ //accept t as argument for table
        this.column[this.column.length] =  callback;
        return this;
    }

    exist( callback ){
        db.schema.hasTable(this.name).then(callback);

    }

    create(){
        this.exist((cap)=>{
            if(cap)
                return;
            
            return db.schema.createTable(this.name, (t)=>{
                this.column.forEach(e => {e(t)});
            }).then(()=>{
                console.log(`Table ${this.name} has been created.`);
            });
        });
    }

    reset(){
        this.drop();
        this.create();
        return this;
    }

    drop(){
        this.exist((cap)=>{
            if(!cap)
                return;
            return db.schema.dropTable(this.name).then(()=>{
                console.log(`Table ${this.name} has been removed.`);
            });
        });
    }
}