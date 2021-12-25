const express = require("express");
const router = express.Router();
const User = require('../Models/User.js');
const Flight = require('../Models/Flight.js');
const Reservation = require('../Models/Reservation.js');
const stripe = require("stripe")("sk_test_51KAWXcJlpdeHnsoJikmh1fh5FqRAOReEtdfOusSTFcsiikALdVKe9X8KOKoiAAtF0A7eonyp9eRY1QxQFkMUBNhf00dknzDztZ");
require ("dotenv").config();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('../passport-config.js');
initializePassport(passport,
  email =>
  User.find(User => User.email === email),
  id =>
  User.find(User => User._id === id)
);

//view Available flights
router.get('/ViewAvailableFlights', async (req, res) => {
        allFlights = await Flight.find();
        if(allFlights = allFlights.filter(u => u.Available == true)){
            try{
                res.status(200).json(allFlights);
            }
            catch(error){
                res.status(404).json({message: error.message});
            }
        }
});

//view flight Details
router.get('/ViewDetails/:id', async (req,res) => {
    Flighty = await Flight.findById(req.params.id);
    res.status(200).json(Flighty);
})

//Create new Flight
router.post('/:Email/CreateFlight', async (req, res) => {
    allUsers = await Admin.find();
    allUsers = allUsers.filter(u=> u.Email.toString() == req.body.Email);
    if (allUsers.AdminPrivilieges = "True") {
        const allSeats = req.body.Seats
        let mySeats = [];
        let x = 1;
        for(let i=0;i<allSeats;i++){
            mySeats.push('Seat:'+x)
            x+=1;
        }
        // console.log(mySeats)
        const newFlight = new Flight({
            Code: req.body.Code, Airport: req.body.Airport, Cabin: req.body.Cabin, Baggage: req.body.Baggage,
            Date: req.body.Date,Terminal: req.body.Terminal, Arrival: req.body.Arrival, Departure: req.body.Departure, 
            From: req.body.From, To: req.body.To, Price:req.body.Price, Seats: req.body.Seats, TripDuration: req.body.TripDuration, 
            Available: req.body.Available, SeatsArray:mySeats
        })
        newFlight.save().then(Flight => res.json(Flight));
    }
});

//ViewDeparture
router.get('/ViewDeparture/:id',async(req,res)=>{
    const Flighty = await Flight.findById(req.params.id);
    allFlights = await Flight.find();
    allFlightsx = await Flight.find();
    allFlights = allFlights.filter(F=>F.To==Flighty.From);
    allFlightsx = allFlightsx.filter(F=>F.From==Flighty.To);
    try{
        if(allFlights!=null)
        res.send(allFlights);
        else if(allFlightsx!=null)
        res.send(allFlightsx);
    }
    catch{
        res.status(400).send("There is no departure Flights");
    }
    
})

//Reserve flight
router.post('/ReserveFlight/:id', async(req,res) =>{
    const flighty = await Flight.findById(req.params.id);
    const Selected =req.body.SeatNumber;
    console.log(Selected)
        try{
            //Create reservation
            console.log("l2")
            for(let i=0; i<Selected.length; i++){
                console.log("x")
                const index = parseInt(Selected[i]);
                if(flighty.SeatsArray[index-1]!="Not Available"){
                    flighty.SeatsArray[index-1]="Not Available";
                    console.log(flighty.SeatsArray[index-1])
                }
                else{   
                    console.log("z")
                    res.status(400).send("Couldn't reserve Seat");
                }
            }
            console.log("1")
            const newReservation =new Reservation({Attendant:req.body.Attendant,
            Tickety:req.body.Tickety,SeatNumber:req.body.SeatNumber,Price:req.body.Price});
            await newReservation.save().then(Reservation => res.json(Reservation));
            flighty.Seats-=parseInt(Selected.length);
            if(flighty.Seats==0){
                flighty.Available="false";
            }
            console.log("@");
            await flighty.save().then(Flight => res.json(Flight));
        }
        catch{
            console.log("Allo");
        }
})


router.delete('/CancelReservation/:id', async(req,res)=>{
    try{
    const Reservationy= await Reservation.findById(req.params.id);
    console.log('xxxxxx'+ Reservationy +'xxxxxx');
    Ticket = await Reservationy.Tickety;
    const flighty = await Flight.findById(Ticket);
    Seaty = await Reservationy.SeatNumber;
    console.log(Seaty);
    console.log(Seaty.length)
    for(let i=0; i<Seaty.length; i++){
        console.log("x")
        const index = parseInt(Seaty[i])
        flighty.SeatsArray[index-1]='Seat:'+ [index];}
    console.log(Seaty.length)
    var flightys = parseInt(flighty.Seats);
    await(flightys += Seaty.length);
    await (flighty.Seats = flightys);
    console.log(flightys)
    flighty.Available = true;  
    await flighty.save().then(Flight => res.json(Flight));
    await Reservation.findById(req.params.id)
    .then(Reservation => Reservation.remove().then(() => res.json({ success: true })))
    // await Reservation.findById(req.params.id)
    // .then(Reservation => Reservation.remove().then(() => res.json({ success: true })))
    // .catch(err => res.status(404).json({ sucess: false }));
    }
    
    catch{
        console.log("Error")
    }

    
});

router.get('/viewReservations/:id', async (req, res) => {
        
    try {   
            const allReservations = await Reservation.find();
            // const user = await User.findById(req.params.id);
            attendant = await allReservations[Attendant=req.params.id]
            console.log(attendant)
            let alo = [];
            //allFlights = allFlights.filter(F=>F.To==Flighty.From);
            for(i=0;i<allReservations.length;i++){
                if(allReservations[i].Attendant==req.params.id)
                    alo.push(allReservations[i])
            }
            res.status(200).send(alo);
            // const llo = await(req.params.id);
            // console.log('a')
            // const user = await allReservations.findOne({Attendant:llo});
            // console.log(user)
            // const allReservations = await Reservation.find();
            // // console.log
            // if(
            // attendant.equals(user._id))
            //     res.status(200).json(allReservations);
            // console.log(allReservations)
            //const My = await Reservation.Tickety;
            //const all = await 
            //res.status(200).json(allReservations);
        } 
        catch (error) {
            res.status(404).json({noReservationFound: 'No Reservations found'});
        }
});

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split('')[1]
    if(token==null)
        return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

router.put('/EditReservation/:id',async(req,res)=>{ 
    const allReservations = await Reservation.findById(req.params.id);
    const seataty = await allReservations.SeatNumber;
    console.log(allReservations.SeatNumber)
    const flighty = await Flight.findById(allReservations.Ticket);
    console.log(allReservations)
    try{
        console.log("Y")
        
        console.log("Y1")
        
        const allReservations = await Reservation.findById(req.params.id);
        Ticket = await allReservations.Tickety;
        const flighty = await Flight.findById(Ticket);
        Seaty = await allReservations.SeatNumber;
        console.log(Seaty);
        console.log(Seaty.length)
        for(let i=0; i<Seaty.length; i++){
            console.log("1")
            const index = parseInt(Seaty[i])
            flighty.SeatsArray[index-1]='Seat:'+ [index];
        }

        await allReservations.updateOne({"SeatNumber":req.body.SeatNumber});
        console.log("Y2")
        await allReservations.save().then(Reservation => res.json(Reservation));
        console.log("z")
    }
    catch{
        console.log("x")
        res.status(400).send("Please Choose Valid Seats");
    }
    
    for(let i=0; i<seataty.length; i++){
        console.log("x")
        const index = parseInt(seataty[i]);
        if(flighty.seataty[index-1]!="Not Available"){
            flighty.SeatsArray[index-1]="Not Available";
            console.log(flighty.SeatsArray[index-1])
        }
        else{   
            console.log("z")
            res.status(400).send("Couldn't reserve Seat");
        }
    }
        await flighty.save().then(Flight => res.json(Flight));
})

router.post("/payment", async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Flight Reservation",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      console.log('@@isLoggedIn req.isAuthenticated()=true');
      req.session.isAuthenticated = true;
      res.locals.isAuthenticated = true;
      res.locals.user = req.user;
      next(); //If you are authenticated, run the next
    } else {
      console.log('@@isLoggedIn req.isAuthenticated()=false');
      return res.redirect("/login");
    }
  }

//middleware put it whenever we want to authenticate
function checkAuthenticated(req,res,next) {
    if(req.isAuthenticated()){
        return next()
    }
      res.redirect('/login')
}

//middleware put it whenever we don't want an authenticated to go to (like login matro7sh login madam enta logged in,register brdo)
function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
            return res.redirect('/Home')
    }
          next()
        }







module.exports = router;