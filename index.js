const express = require('express');
const cors = require('cors')
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = 5000;

//using middle ware 
app.use(cors());
app.use(express())

app.get('/',(req, res) =>{
    res.send('server runnig on heroku')
})

//DATABASE_USERNAME = Inventory-management
// DATABASE_PASSWORD = iDfLuk4b6gGqnUiy

const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.1f2fl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('database connected with my new server')
  // perform actions on the collection object
  client.close();
});


app.listen(port,()=>{
    console.log(`listening to the port ${port}`)
} )