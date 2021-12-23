const express = require("express");
const router = express.Router();
const User = require('../Models/User.js');
const Flight = require('../Models/Flight.js');
const Admin = require('../Models/Admin.js');
const Reservation = require('../Models/Reservation.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


//Sign up as a guest user
router.post('/register', async (req, res) => {
    allUser = await User.findOne({Email:req.body.Email});
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.Password,salt);
    // console.log(user);
    if (allUser!=null) {

        res.status(300).send({ err: "Email already exists!!!" });
        return;
    }
    else{
    //     const newUser = User({Email:req.body.Email,Password:req.body.Password,PassportNumber:req.body.PassportNumber});
    // newUser.save().then(User => res.json(User));
    const user = new User({Email:req.body.Email,Password:hashedPassword,AdminPrivilieges:req.body.AdminPrivilieges,
        PassportNumber:req.body.PassportNumber,FirstName:req.body.FirstName,LastName:req.body.LastName,
        Address:req.body.Address,CountryCode:req.body.CountryCode,Telephone:req.body.Telephone});
    
    // generate salt to hash password
    //const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    // hash(salt+'password');
    user.save().then(User => res.json(User));}
  });
    

// async function generateJWT(username) {
//     try {
//       const payload = { username };
//       const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
//       return { error: false, token };
//     } catch (error) {
//       return { error: true };
//     }
//   }
//Sign in as a user
// router.post('/Signin', async (req, res) => {
//     console.log('Test sign')
//     allUsers = await User.find();
//     allUsers = allUsers.filter(u => u.Email.toString() == req.body.Email);

//     if (allUsers.length > 0) {
//         if (allUsers[0]['Password'] == req.body.Password) {
//             const token =jwt.sign({ foo: req.username }, 'shhhhh');
//             res.json({token, _id:allUsers._id});
//             console.log(token);
        
//         }
//         else{
//             res.status(300).send({err:"Your credentials could not be verified!"});
//         }
//     }
//     else{
//         res.status(300).send({err:"SignUp Instead"});
//     }
    
   
// });

router.post("/login", async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ Email: body.Email });

    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.Password, user.Password);
      if (validPassword) {
        const token =jwt.sign({ foo: req.username }, 'shhhhh');
        res.status(200).json({ message: "Valid password" ,token, _id:user._id});
        console.log(token);
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  });


//view user Details
router.get('/ViewUser/:id', async (req,res) => {
    Usery = await User.findById(req.params.id);
    res.status(200).json(Usery);
})




//View all Flights for admin
router.get('/:Email/ViewAllFlights', async (req, res) => {
    allUsers = await Admin.find();
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
    allUsers = await Admin.find();
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
    allUsers = await Admin.find();
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
            {From: keyWord},
            {TripDuration: keyWord},
            {Price:keyWord},
            {To: keyWord},   
            {Terminal: keyWord}]})
        console.log(allFlights)
        res.status(200).send(allFlights)
    }
    else{
        res.status(400).send("You're not an admin")
    }
})

router.put('/EditProfile/:id',async(req,res)=>{
    allUsers = await User.findById(req.params.id);
    await allUsers.updateOne({"Email": req.body.Email,"Password": req.body.Password, "FirstName": req.body.FirstName,
    "LastName": req.body.LastName,"PassportNumber": req.body.PassportNumber,"Address":req.body.FirstName,"CountryCode":req.body.CountryCode,
    "Telephone":req.body.Telephone});

})

router.put('/ChangePassword/:id',async(req,res)=>{
    allusers = await User.findById(req.params.id);
    const validPassword = await bcrypt.compare(req.body.OldPassword, allusers.Password);
    if (allusers!=null) {
        if(validPassword){
             await allusers.updateOne({"Password": req.body.NewPassword})
             res.status(200).send("Password Changed Successfuly");
         }
         else{
            res.status(400).send("Please Enter Your Old Password Correctly")
         
        }
    }
    else{
        res.status(401).json({ error: "User does not exist" });
    }      
})

module.exports = router;