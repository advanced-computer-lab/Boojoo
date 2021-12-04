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
    allFlights = allFlights.filter(F=>F.To==Flighty.From);
    if(allFlights!=null){
        try{
            res.send(allFlights);}
        catch{
            res.status(400).send("There is no Departure Flights");
        }
    }
    
})

router.post('/ReserveFlight/:id', async(req,res) =>{
    const flighty = await Flight.findById(req.params.id);
    const Selected =req.body.SeatNumber;
        try{
            //Create reservation
            console.log("l2")
            for(let i=0; i<Selected.length; i++){
                console.log("x")
                const index = parseInt(Selected[i]);
                if(flighty.SeatsArray[index-1]!="Not-Available"){
                    console.log(flighty.SeatsArray[index-1])
                    flighty.SeatsArray[index-1]="Not Available";}
                else{   
                    console.log("z")
                    res.status(400).send("Couldn't reserve Seat");
                }
            }
            console.log("1")
            const newReservation =new Reservation({Attendant:req.body.Attendant,
            Tickety:req.body.Tickety,SeatNumber:req.body.SeatNumber,Price:req.body.Price});
            newReservation.save().then(Reservation => res.json(Reservation));
            flighty.Seats-=parseInt(Selected.length);
            if(flighty.Seats==0){
                flighty.Available="false";
            }
            console.log("@");
            console.log(parseInt(flighty.Seats));
            console.log(parseInt(Selected.length));
        
        }
        catch{
            res.status(200).send("Connection timed out");
        }
})


router.delete('/CancelReservation/:id', async(req,res)=>{
    await Reservation.findById(req.params.id)
    .then(Reservation => Reservation.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ sucess: false }));
    // const Reservationy=Reservation.findById(req.params.id);
    // const Ticket = Reservationy.Tickety;
    // const Seaty = Reservationy.SeatNumber;
    //  Ticket.SeatsArray[Seaty+1]=0;
    // Ticket.Seats +=1;
    // Ticket.Available = True;  
});

router.get('/viewReservations', async (req, res) => {
        try {
            const allReservations = await Reservation.find();
            const My = await Reservation.Tickety;
            const all = await 
            res.status(200).json(allReservations.Attendant,allReservations.Tickety,allReservations.SeatNumber);
        } 
        catch (error) {
            res.status(404).json({noReservationFound: 'No Reservations found'});
        }
});





module.exports = router;