// set up express app & required const variables
const express = require('express');
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 8000;
const myModules = require('./operations/myFunctions')
require('dotenv').config();



// set up DB connection
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'shoesAPI'

    MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
        .then(client => {
            console.log(`Connected to ${dbName} Database`)
            db = client.db(dbName)
        });

        // use cors package
app.use(cors());

//use ejs and access public folder
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


// urls
app.get('/',(request, response)=>{
    db.collection('shoes').find().toArray()
    .then(data => {
        // console.log(data)
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})


// POST request to DB connection
app.post('/addShoe', (request, response) => {
    const rawReleaseNameStr = request.body.releaseName
    const clearUrl = myModules.rawStrToUrl(rawReleaseNameStr)
    console.log(clearUrl)

    db.collection('shoes').insertOne({
        brand: request.body.brand,
        releaseDate: request.body.releaseDate,
        imgURL: request.body.imgURL,
        releaseName: clearUrl,
        sizes: request.body.sizing, 
    })
    .then(result => {
        console.log(`Shoe Added: ${clearUrl}`)
        response.redirect('/')
    })
    .catch(error => console.error(error));
});


// delete request to DB
app.delete('/deleteShoe', (request, response) => {
    db.collection('shoes').deleteOne({birthName: request.body.birthName})
    .then(result => {
        console.log('Shoe Deleted')
        response.json('Shoe Deleted')
    })
    .catch(error => console.error(error))
});


// Initialize server
app.listen(PORT, () => {
    console.log(`The server is now running on port ${PORT}! PoggersChampion Kappa`);
});

// Export the Express API
module.exports = app;