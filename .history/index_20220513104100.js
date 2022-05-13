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

const uri = `mongodb+srv://${ process.env.DATABASE_USERNAME }:${ process.env.DATABASE_PASSWORD }@cluster0.1f2fl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const database = client.db('Bikeware');
        const collection = database.collection('Bikes');

        //demo server hello world
        app.get('/', (req, res) => {
            res.send('server runnig on heroku')
        })


        //get all documents from database with find operation of mongodb
        app.get('/item', async (req, res) => {
            const query = {}
            const cursor = collection.find(query)
            const result = cursor.toArray();
            res.send(result)
        })

        //posting api through react form


    }
    finally {

    }
}
run().catch(console.dir())


app.listen(port, () => {
    console.log(`listening to the port ${ port }`)
})