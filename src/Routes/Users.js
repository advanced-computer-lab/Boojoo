const express = require("express");
const router = express.Router();
const User = require('../Models/User.js');
const Flight = require('../Models/Flight.js');
const Admin = require('../Models/Admin.js');
const Reservation = require("../Models/Reservation.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



//Sign up as a guest user
router.post('/register', async (req, res) => {
    const body = await (req.body);
    allUser = await User.findOne({Email:body.Email});
    
    // console.log(user);
    if (allUser!=null) {

        res.status(300).send({ err: "Email already exists!!!" });
        return;
    }
    else{
    //     const newUser = User({Email:req.body.Email,Password:req.body.Password,PassportNumber:req.body.PassportNumber});
    // newUser.save().then(User => res.json(User));
    var usery = await body.Password;
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    usery = await bcrypt.hash(usery, salt);
    const user = new User({
        Email: req.body.Email, Password: usery,  FirstName: req.body.FirstName, PassportNumber: req.body.PassportNumber,
        LastName:req.body.LastName,Address:req.body.Address, CountryCode:req.body.CountryCode, Telephone:req.body.Telephone, 
    })
    await user.save().then(User => res.json(User));
    }   
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

router.post('/registerAdmin', async (req, res) => {
    const body = await (req.body);
    allAdmin = await Admin.findOne({Email:body.Email});
    console.log('allo')
    // console.log(user);
    if (allAdmin!=null) {

        res.status(300).send({ err: "Email already exists!!!" });
        return;
    }
    else{
    //     const newUser = User({Email:req.body.Email,Password:req.body.Password,PassportNumber:req.body.PassportNumber});
    // newUser.save().then(User => res.json(User));
    var adminy = await body.Password;
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    adminy = await bcrypt.hash(adminy, salt);
    body.Password=adminy;
    const admin = new Admin(req.body);
    await admin.save().then(Admin => res.json(Admin));
    }   
});

//login
router.post("/login", async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ Email: body.Email });
    const admin = await Admin.findOne({Email:req.body.Email});
    if (user) {
      // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.Password, user.Password);
    if (validPassword) {
        const token =jwt.sign({ foo: req.username }, 'shhhhh');
        res.status(200).json({ message: "Valid user password" ,token, _id:user._id});
        console.log(token);
    } else {
        res.status(400).json({ error: "Invalid Password" });
    }
    }
    else if(admin){
        const validPasswordy = await bcrypt.compare(req.body.Password, admin.Password);
    if (validPasswordy) {
        const tokeny =jwt.sign({ foo: req.username }, 'shhhhh');
        res.status(200).json({ message: "Valid admin password" ,tokeny, _id:admin._id});
        console.log(tokeny);
    }
    else{
        res.status(400).json({error:"Invalid Password"});
        }
    }
    else {
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
        allFlightsx = await Flight.find()
        // for(var i = 0; i < allFlightsx.length; i){
        //     parseInt(allFlightsx[1].Seats);
        //     allFlightsx[i].save().then(Flight => res.json(Flight))
        // }; 
        allFlights = await Flight.find({$or: 
            [{Code: keyWord}, 
            {Seats: {$gte: keyWord}}, 
            {Arrival: keyWord}, 
            {Airport: keyWord}, 
            {Departure: keyWord}, 
            {Date: keyWord}, 
            {Cabin: keyWord},
            {Baggage: keyWord},
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

//Edit profile
router.put('/EditProfile/:id',async(req,res)=>{
    allUsers = await User.findById(req.params.id);
    //console.log(req.body.PassportNumber)
    //console.log(req.body.LastName)
    //console.log(req.body.Address)
    //console.log(req.body.Telephone)
    //console.log(req.body.CountryCode)
    await allUsers.updateOne({"Email": req.body.Email, "FirstName": req.body.FirstName,
    "LastName": req.body.LastName,"PassportNumber": req.body.PassportNumber,"Address":req.body.Address,"CountryCode":req.body.CountryCode,
    "Telephone":req.body.Telephone});
})

//Change password
router.put('/ChangePassword/:id',async(req,res)=>{
    allusers = await User.findById(req.params.id);
    console.log(req.body.OldPassword)
    console.log(req.body.NewPassword)
    const validPassword = await bcrypt.compare(req.body.OldPassword, allusers.Password);
    if (allusers!=null) {
        if(validPassword){
            var pass = await req.body.NewPassword;
    // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
        pass = await bcrypt.hash(pass, salt);
                await allusers.updateOne({"Password": pass})
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







module.exports = router;