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

router.post(':Email/ReserveFlight/:id', async(req,res) =>{
    allusers = await User.find();
    allusers = allusers.filter(u => u.email.toString()==req.body.Email);
    if(allusers.length>0){
        try{
            const Userx = allusers[0];
            // const Flighty = await Flight.findById(req.params.id);
            //Create reservation
            const myReservation = await Reservation(req.body)
            res.send(myReservation)
            
        }
        catch{
            res.status(400).send("You aren't registered");
        }
    }
    
    
})



module.exports = router;