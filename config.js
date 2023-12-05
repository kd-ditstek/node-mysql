module.exports ={
    "database":{
         "host": process.env.HOST,
         "port": 3306,
         "user": process.env.DBUSER,
         "password": process.env.DBPASS,
         "database": process.env.DBNAME
    },
    "pool": {
        "max": 5,
        "min": 0,
        "acquire": 30000,
        "idle": 10000
      }
 };