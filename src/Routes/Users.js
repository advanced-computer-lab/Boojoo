const express = require("express");
const router = express.Router();
const User = require('../Models/User.js');
const Flight = require('../Models/Flight.js');
const Admin = require('../Models/Admin.js');
const Reservation = require("../Models/Reservation.js");


//returns users
router.get('/',async(req,res) => {
    //console.log("here");
const ausers =await User.find();
//console.log(ausers);
return res.status(200).send( ausers);

})
//Sign up as a guest user
router.post('/register', async (req, res) => {
    allUser = await User.find();
    allUser = allUser.filter(u => u.Email.toString() === req.body.Email.toString());
    // console.log(user);
    if (allUser.length > 0) {
        
        return res.status(300).send({ err: "Email already exists!!!" });
        
    }
    else{
        const newUser = User(req.body);
    newUser.save().then(User => res.json(User));
    return res.status(200).send({suc: "user created !"});
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

// router.put('/:id/EditProfile',async(req,res)=>{
//     allUsers=User.findById(req.params.id);
//     await User.findById(req.params.id)
//         .then(User => User.update().then(() => res.json({ sucess: true })))
//         .catch(err => res.status(404).json({ sucess: false }))
//     if (allUsers.AdminPrivilieges = "False") {
//         user = await User.findById(req.params.id);
//         await user.update({ "email": req.body.email, "password": req.body.password , "PassportNumber":req.body.PassportNumber ,
//          "FirstOne"});
//     }

//     else {
//         await user.update(req.body);
//     }
// });








module.exports = router;