const express = require('express');
var bodyParser = require('body-parser');

const cors = require('cors')
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config()
const port = process.env.PORT || 5000;

//using middle ware 
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



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
        app.get('/items', async (req, res) => {
            const query = {};
            const cursor = bikesCollection.find(query).limit(6);
            const result = await cursor.toArray();
            res.send(result)
        })

        //showing detail api
        app.get('/item/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await bikesCollection.findOne(query);
            res.send(result);
        })

        //updating the quantity of the product
        app.put('/item/:id', async (req, res) => {
            const id = req.params.id;
            const quantity = req.body;
            const filter = { _id: ObjectId(id) };
            const option = { upsert: true }
            const updatedDoc = {
                $set:quantity
                
            }
            const result = await bikesCollection.updateOne(filter, updatedDoc, option);
            res.send(result);
        })


        //posting data from client side to server side
        app.post('/myItems', async (req, res) => {
            const newItem = req.body;
            const result = await bikesCollection.insertOne(newItem);
            res.send(result);
        })

        //deleting data from client side and also database
        app.delete('/allItems/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const deleteItem = await bikesCollection.deleteOne(query)
            res.send(deleteItem);
        })

        //updating data from client side to server side
         app.put('/myItem/:id', async (req, res) => {
            const id = req.params.id;
            const updateItem = req.body;
            const filter = { _id: ObjectId(id) };
            const option = { upsert: true };
            const updateDoc = {
                $set: {
                    updateItem,
                }
             }
             const result = await bikesCollection.updateOne(filter, option, updateDoc);
             res.send(result);
        }) 

        /* getting my item which is based on user  */
        app.get('/myItem', async (req, res) => {
            const usersEmail = req.body.email;
            console.log(usersEmail)
            const query = { usersEmail };
            const cursor = bikesCollection.find(query)
            const result = await cursor.toArray();
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(console.dir)


//demo home page
app.get('/', (req, res) => {
    res.send('welcome to heroku')
})


app.listen(port, () => {
    console.log(`listening to the port ${ port }`)
})