const express = require('express');
const cors = require('cors')
const app = express();
const port = 5000;

//using middle ware 
app.use(cors());
app.use(express())

app.get('/',(req, res) =>{
    res.send('server runnig on heroku')
})

app.listen(port,()=>{
    console.log(`listening to the port ${port}`)
} )