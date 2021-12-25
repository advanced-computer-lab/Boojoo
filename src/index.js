require ("dotenv").config();
const passport = require('passport');

const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('./passport-config.js');
initializePassport(passport,
  email =>
  User.find(User => User.email === email),
  id =>
  User.find(User => User._id === id)
);
const express = require('express');
const mongoose = require('mongoose');
const userController = require('./Routes/Users.js');
const flightController = require('./Routes/Flights.js')
const cors = require('cors');
// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
// const uuid = require("uuid/v4");

//App variables
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

//app.get('/', (req,res)=>{
  //res.render('index.js',{ name:req.user.FirstName})
//})






//
//app.delete('/logout',(req, res) => {
//   req.logOut()  
//   res.redirect('/login')
// })


// router.post('/register', async (req, res) => {
//   allUser = await User.findOne({Email:req.body.Email});
//   const salt = await bcrypt.genSalt();
//   const hashedPassword = await bcrypt.hash(req.body.Password,salt);
//   // console.log(user);
//   if (allUser!=null) {

//       res.status(300).send({ err: "Email already exists!!!" });
//       return;
//   }
//   else{
//   //     const newUser = User({Email:req.body.Email,Password:req.body.Password,PassportNumber:req.body.PassportNumber});
//   // newUser.save().then(User => res.json(User));
//   const user = new User({Email:req.body.Email,Password:hashedPassword,
//       PassportNumber:req.body.PassportNumber,FirstName:req.body.FirstName,LastName:req.body.LastName,
//       Address:req.body.Address,CountryCode:req.body.CountryCode,Telephone:req.body.Telephone});
  
//   // generate salt to hash password
//   //const salt = await bcrypt.genSalt(10);
//   // now we set user password to hashed password
//   // hash(salt+'password');
//   user.save().then(User => res.json(User));}
//   res.redirect('/login');
// });

const port = process.env.PORT || "8000";
// #Importing the userController

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads// configurations
app.use('/users', userController);
app.use('/flights', flightController);

// Mongo DB
const CONNECTION_URL = "mongodb+srv://dbBeedo:dbBeedo123456@skillsbuild-cluster.yzjwp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

app.get("/Home", (req, res) => {
    res.status(200).send("You have everything installed !");
  });

app.post('/signin', passport.authenticate('local',{
  successRedirect :'/Home',
  failureRedirect :'/signin',
  failureFlash : true
}))

// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });