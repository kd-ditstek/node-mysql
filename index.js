require("dotenv").config();
const express = require("express");
const app = express();
const bodyparse = require("body-parser");
const postRouter = require('./app/routes/routes.js')

const db = require('./app/db.js');
const  sequelize = db.sequelize;

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

// create express app

app.use(bodyparse.urlencoded({extended: true}))

app.use(bodyparse.json())

app.use('/post',postRouter);


app.listen(process.env.PORT, () => {
    console.log("Server listing on 4000")
})

module.exports = app;