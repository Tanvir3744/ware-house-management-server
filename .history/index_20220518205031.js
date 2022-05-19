const express = require('express');
const cors = require('cors')
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config()
const port = process.env.PORT || 5000;

//using middle ware 
app.use(cors());
app.use(express())



//DATABASE_USERNAME = Inventory-management
// DATABASE_PASSWORD = iDfLuk4b6gGqnUiy


const uri = `mongodb+srv://${ process.env.DATABASE_USERNAME }:${ process.env.DATABASE_PASSWORD }@cluster0.3ypql.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const bikesCollection = client.db('Bikeware').collection('bikes');


        //getting all the items which is saved in database
        app.get('/allItems', async (req, res) => {
            const query = {};
            const cursor = bikesCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        //limited items for home page
        app.get('items', async (req, res) => {
            const query = {};
            const cursor = bikesCollection.find(query);
            const result = await cursor.limit(6).toArray();
            res.send(result)
        })

        //

        //posting data from client side to server side

        //deleting data from client side and also database

        //updating data from client side to server side 

    }
    finally {

    }
}
run().catch(console.log)


//demo home page
app.get('/', (req, res) => {
    res.send('welcome to heroku')
})


app.listen(port, () => {
    console.log(`listening to the port ${ port }`)
})