const express = require('express');
const cors = require('cors')
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config()
const port = process.env.PORT || 5000;

//using middle ware 
app.use(cors());
app.use(express())



//DATABASE_USERNAME = Inventory-management
// DATABASE_PASSWORD = iDfLuk4b6gGqnUiy
app.get('/', (req, res) => {
    res.send('welcome to heroku')
})


app.listen(port, () => {
    console.log(`listening to the port ${ port }`)
})