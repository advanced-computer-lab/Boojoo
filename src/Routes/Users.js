const express = require("express");
const router = express.Router();
const User = require('../Models/User.js');
const Flight = require('../Models/Flight.js');
const Admin = require('../Models/Admin.js');



//Sign up as a guest user
router.post('/register', async (req, res) => {
    allUser = await User.find();
    allUser = allUser.filter(u => u.Email.toString() == req.body.Email.toString());
    // console.log(user);
    if (allUser.length > 0) {

        res.status(300).send({ err: "Email already exists!!!" });
        return;
    }
    else{
        const newUser = User(req.body);
    newUser.save().then(User => res.json(User));
    }
});

//Sign in as a user
router.post('/Signin', async (req, res) => {
    console.log('Test sign')
    allUsers = await User.find();
    allUsers = allUsers.filter(u => u.Email.toString() == req.body.Email);

    if (allUsers.length > 0) {
        if (allUsers[0]['Password'] == req.body.Password) {
            const token =jwt.sign({ foo: req.username }, 'shhhhh');
            res.json({token, _id:allUsers._id});
        
        }
        else{
            res.status(300).send({err:"Your credentials could not be verified!"});
        }
    }
    else{
        res.status(300).send({err:"SignUp Instead"});
    }

});


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

//View all Flights for admin
router.get('/:Email/ViewAllFlights', async (req, res) => {
    allUsers = await User.find();
    allUsers = allUsers.filter(u=> u.Email.toString() == req.body.Email);
    if (allUsers.AdminPrivilieges = "True") {
        try {
            const allFlights = await Flight.find();
            res.status(200).json(allFlights);
        } 
        catch (error) {
            res.status(404).json({message: error.message});
        }
        //allFlights = await Flight.find();
        //allFlights = allFlights.filter(u => u.Available == true)

    }
});

//Update Flight
router.put('/:Email/UpdateFlight/:id', async (req, res) => {
    allUsers = await User.find();
    allUsers = allUsers.filter(u=> u.Email.toString() == req.body.Email);
    if (allUsers.AdminPrivilieges = "True") {
        //Flight.findByIdAndUpdate(req.params.id, req.body)
        //.then(Flight => res.json({ msg: 'Updated successfully' }))
        //.catch(err => res.status(400).json({ error: 'Unable to update the Database' })
        //);
        flight = await Flight.findById(req.params.id);
        await flight.updateOne(req.body);
    }
    else{
        res.status(404).send("User isn't Admin !!");
    }
});

//Delete Flight
router.delete('/:Email/DeleteFlight/:id',async(req,res)=>{
    allUsers = await User.find();
    allUsers = allUsers.filter(u=> u.Email.toString() == req.body.Email);
    if (allUsers.AdminPrivilieges = "True") {
        Flight.findById(req.params.id)
        .then(Flight => Flight.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ sucess: false }));

}
});

//Search flight by keyword
router.get('/:Email/SearchFlight/:searchTerm', async(req,res)=>{
    allUsers = await User.find();
    allUsers = allUsers.filter(u=> u.Email.toString() == req.body.Email);
    if(allUsers.AdminPrivilieges = "True") {
        keyWord = req.params.searchTerm
        //console.log(keyWord);
        allFlights = await Flight.find({$or: 
            [{Code: keyWord}, 
            {Arrival: keyWord}, 
            {Airport: keyWord}, 
            {Departure: keyWord}, 
            {Date: keyWord}, 
            {BusniessSeats: keyWord},
            {EcoSeats: keyWord},
            {Available: keyWord},   
            {Terminal: keyWord}]})
        console.log(allFlights)
        res.status(200).send(allFlights)
    }
    else{
        res.status(400).send("You're not an admin")
    }
})

router.put('/:id/EditProfile/',async(req,res)=>{
    await User.findById(req.params.id)
    .then(User=>User.update().then(() => res.json({success:true})))
    .catch(err => res.status(404).json({sucess:false}))
    if(User.AdminPrivilieges == "True"){
        user = await User.findById(req.params.id);
        await user.update(req.body);
    }
    else{
        await user.update({"Email": req.body.Email,"Password": req.body.Password, "FirstName": req.body.FirstName,
        "LastName": req.body.LastName,"PassportNumber": req.body.PassportNumber})
    }

})








module.exports = router;