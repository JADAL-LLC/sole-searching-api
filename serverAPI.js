// set up express app & required const variables
const express = require('express');
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 8001;
const myModules = require('./sole-searching-api/operations/myFunctions')
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


// Delete request to DB
app.delete('/deleteShoe', (request, response) => {
    console.log(request.body.itemFormJS)
    console.log(request.body.itemFormJS2)
    db.collection('shoes').deleteOne({releaseName: request.body.itemFormJS})
    .then(result => {
        console.log('Shoe Deleted')
        response.json('Shoe Deleted')
    })
    .catch(error => console.error(error))
});

// Update request to DB
app.put('/updateShoe', (request, response) => {
    console.log(request.body.itemFormJS)
    db.collection('shoes').updateOne({releaseName: request.body.itemFormJS},{
        // Change the completed property from false to true
        $set: {
            releaseName: 'hello'
          }
    },{
        // Since we are searching by string, we'll say whichever item that matches string that comes first is what we update
        sort: {_id: -1},

        // If set to true and you try to update something that isn't there, it will create document for you (can save headache if template language is stiff and requires something to be there)
        upsert: false
    })
    // Now responsd to client side
    .then(result => {
        console.log('Marked Complete')
        // Send a json response 'Marked complete to client side'
        response.json('Marked Complete')
    })
    .catch(error => console.error(error))
})

// Initialize server
app.listen(PORT, () => {
    console.log(`The server is now running on port ${PORT}! PoggersChampion Kappa`);
});

// Export the Express API
module.exports = app;