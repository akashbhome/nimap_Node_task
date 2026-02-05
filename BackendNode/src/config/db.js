require('dotenv').config();
let mysql=require("mysql2");

let db=mysql.createConnection({

    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "root",
    database: process.env.DB_NAME || "nimapnode"
    
});

db.connect((err)=>{
    if(err){
        console.log("not connect");

    }
    else{
        console.log("conneced db");

    }

});

module.exports =db;