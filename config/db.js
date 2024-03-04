import  Sequelize  from "sequelize";
import dotenv from 'dotenv'
dotenv.config({path: '.env'})


const db = new Sequelize(  process.env.DATABASE_URL , process.env.DATABASE_USER ?? "root", process.env.DATABASE_PASSWORD ?? "", {
    host: process.env.DATABASE_HOST ?? "localhost",
    dialect: "mysql",
    port: 3306,
    define: {
        timestamps: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});


export default db;