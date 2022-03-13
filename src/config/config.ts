import {config} from 'dotenv';
config();

export default{

    port: process.env.PORT || 3000,
    dbuser: process.env.DB_USER || '',
    dbpw: process.env.DB_PW || '',
    dbserver: process.env.DB_SERVER || '',
    dbdatabase: process.env.DB_DATABASE || '',

    q1: process.env.Q1

};