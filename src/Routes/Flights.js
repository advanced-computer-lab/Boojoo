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
  //  console.log(req.params.id);
    const Flighty = await Flight.find({Code: req.params.id});
    res.status(200).json(Flighty);
})

//Create new Flight
router.post('/CreateFlight', async (req, res) => {
    const allUsers = await User.find();
    const currentUser = allUsers.filter(u=> u.Email.toString() === req.body.Email);
    console.log(currentUser);
    if (currentUser[0].AdminPrivilieges === true) {
        const allSeats = req.body.EcoSeats + req.body.BusniessSeats;
        let mySeats = [];
        for(let i=0;i<allSeats;i++){
            mySeats.push(0)
        }
        // console.log(mySeats)
        const newFlight = new Flight({
            Code: req.body.Code, 
            Airport: req.body.Airport,
            EcoSeats: req.body.EcoSeats,
            BusniessSeats: req.body.BusniessSeats,
            Date: req.body.Date,
            Terminal: req.body.Terminal,
            Arrival: req.body.Arrival,
            Departure: req.body.Departure, 
            Available: req.body.Available,
            From: req.body.From,
            To: req.body.To, 
            Price: req.body.Price,
            TripDuartion: req.body.TripDuartion,
            SeatsArray:mySeats
        })
        
        await new Flight(newFlight).save().then(tempFlight => res.send(tempFlight));
    }
});

// Reserve a seat
router.post('/ReserveFlight', async(req,res) =>{
    //const Flighty = await Flight.findById(req.params.id);
    allusers = await User.find();
    //allusers = allusers.filter(u => u.email.toString()==req.params.Email.toString());
    if(allusers.length>0){
        try{
            // const Userx = allusers[0];
            // const Flighty = await Flight.findById(req.params.id);
            //Create reservation
            const newReservation =new Reservation(req.body);
            newReservation.save().then(Reservation => res.json(Reservation));
        }
        catch{
            res.status(400).send("You aren't registered");
        }
    }
    
    
})


router.delete('/CancelReservation/:id', async(req,res)=>{
    await Reservation.findById(req.params.id)
    .then(Reservation => Reservation.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ sucess: false }));
}); 

router.get('/ViewDeparture/:id',async(req,res)=>{
    const Flighty = await Flight.findById(req.params.id);
    allFlights = await Flight.find();
    allFlights = allFlights.filter(F=>F.To==Flighty.From);
    if(allFlights.length>0){
        try{
            res.send(allFlights);}
        catch{
            res.status(400).send("There is no Departure Flights");
        }
    }
    
})


module.exports = router;