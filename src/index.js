const express = require("express");
const mongoose = require('mongoose');
const userController = require('./Routes/Users.js');
const flightController = require('./Routes/Flights.js')
var cors = require('cors');

//App variables
const app = express();
app.use(cors({ origin: true, credentials: true }));
const port = process.env.PORT || "8000";
// #Importing the userController

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads// configurations
app.use('/users', userController);

app.use('/flights', flightController);

// Mongo DB
const CONNECTION_URL = "mongodb+srv://abdohany:boody1998@cluster0.o1odx.mongodb.net/AbdoDb?retryWrites=true&w=majority";;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

app.get("/Home", (req, res) => {
    res.status(200).send("You have everything installed !");
  });

// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
