const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

async function initialize(passport,getUserByEmail,getUserById){
    const authenticateUser =async (email,Password,done)=>{
        const user = getUserByEmail(Email)
        if(user==null){
            return done(null,false,{ message: 'No user with that email' })
        }

        try{
            if(await bcrypt.compare(Password,user.Password)){
                return done(null,user )
            } else {
                return done(null,false,{ message : 'Password incorrect'})
            }
        }
        catch(e){
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'Email'},authenticateUser))
    passport.serializeUser((user,done)=> done(null,user.id))
    passport.deserializeUser((id,done)=>done(null,getUserById(id)))
}
module.exports = initialize