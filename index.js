const express = require ('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app= express();

app.use(cors());
app.use(bodyParser.json());


const uri = process.env.DB_PATH ;

let client = new MongoClient(uri, { useNewUrlParser: true });
const users=['Jackson' , 'Charlie' , 'Prince'];



app.get('/products', (req,res)=>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find().limit(10).toArray((err, documents)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(documents);
        }
    });
        client.close();
      });   
});


app.get('/user/:id',(req,res)=>{
    const id=req.params.id;
    const name= users[id];
    res.send({id,name});
})
app.post('/addProduct',(req,res)=>{
    const product= req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insertOne(product,(err, result)=>{
        console.log('Successfully Inserted', result);
        if(err){
            console.log(err);
        }
        else{
            res.send(result.ops[0]);
        }
    });
        client.close();
      });     
});

const port = process.env.PORT || 4200;
app.listen(port, ()=> console.log("listening to port 4200"));