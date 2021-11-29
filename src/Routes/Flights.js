const express = require("express");
const router = express.Router();
const User = require('../Models/User.js');
const Flight = require('../Models/Flight.js');
const Reservation = require('../Models/Reservation.js');

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
    allUsers = await User.find();
    allUsers = allUsers.filter(u=> u.Email.toString() == req.body.Email);
    if (allUsers.AdminPrivilieges = "True") {
        const allSeats = req.body.EcoSeats + req.body.BusniessSeats;
        let mySeats = [];
        for(let i=0;i<allSeats;i++){
            mySeats.push(0)
        }
        // console.log(mySeats)
        const newFlight = new Flight({
            Code: req.body.Code, Airport: req.body.Airport,EcoSeats: req.body.EcoSeats,BusniessSeats: req.body.BusniessSeats,
            Date: req.body.Date,Terminal: req.body.Terminal,Arrival: req.body.Arrival,Departure: req.body.Departure, Available: req.body.Available,
            SeatsArray:mySeats
        })
        newFlight.save().then(Flight => res.json(Flight));
    }
});

// Reserve a seat
router.post(':Email/ReserveFlight/:id', async(req,res) =>{
    const Flighty = await Flight.findById(req.params.id);
    allusers = await User.find();
    allusers = allusers.filter(u => u.email.toString()==req.body.Email);
    if(allusers.length>0){
        try{
            // const Userx = allusers[0];
            // const Flighty = await Flight.findById(req.params.id);
            //Create reservation
            const newReservation =new Reservation({Attendant:allusers ,
                Tickety:Flighty, SeatNumber: req.body.SeatNumber
            });
            newReservation.save().then(Reservation => res.json(Reservation));
            
        }
        catch{
            res.status(400).send("You aren't registered");
        }
    }
    
    
})


router.delete(':id/DeleteReservation/:Email', async(req,res)=>{
    Reservationy = await Reservation.findById(req.params.id);
    if(req.params.Email.toString()== Reservationy.Attendant){
        try{
            Reservationy.then(Reservation => Reservation.remove().then(() => res.json({ success: true })))
            .catch(err => res.status(404).json({ sucess: false }));
        }
        catch{
            res.status(400 ).send('You are not the Attendant!!');
        }}
}); 





module.exports = router;