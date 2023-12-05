const config = require('../config.js');
const mysql = require('mysql2');
const Sequelize = require('sequelize');


module.exports = db = {};

    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
        
    const pool =  mysql.createPool({ host, port, user, password });

    pool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql',
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
        
        } }
        
    );

    db.sequelize = sequelize ;

    //init the model
    const Category = require('../app/model/category.js');
    const Post = require('../app/model/post.js');
    db.Category = Category;
    db.Post = Post;

    db.Category.hasMany(Post, {foreignKey: 'catId'});
 
    db.Post.belongsTo(Category, {foreignKey: 'catId'});

    sequelize.sync({force: true});

    // pool.getConnection( (err, con) => {
    //     console.log(err)
    //     try{
    //         if(con){
    //             con.release();

    //             pool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    //             // connect to db
    //             const sequelize = new Sequelize(database, user, password, { dialect: 'mysql',
    //             pool: {
    //                 max: config.pool.max,
    //                 min: config.pool.min,
    //                 acquire: config.pool.acquire,
    //                 idle: config.pool.idle
                    
    //                 } }
                    
    //             );
            
    //             db.sequelize = sequelize ;

    //             //init the model
    //             db.Post = require('../app/model/post.js')
    //             sequelize.sync();
    //             resolve({"status":"success", "data":"MySQL connected.", "con":pool});
    //         }
    //     }catch(err){
    //         console.log("connection failed")
    //         reject({"status":"failed", "error":`MySQL error. ${err}`});
    //     }
    //     resolve({"status":"failed", "error":"Error connecting to MySQL."});
    // })

