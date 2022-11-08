
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// const GoogleStrategy = Strategy
import GoogleModel from "../models/googleModel";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../utils/config";


const PassportFunction =(passport:any)=>{
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    // console.log(accessToken)
    const newUser = new GoogleModel({
      googleId: profile.id,
      displayName: profile.displayName,
      // image: profile.photos[0]?.value,
    })

    try {
      let user = await GoogleModel.findOne({ googleId: profile.id })

      if (user) {
        console.log("This is from findone")
        console.log(user)
        done(null, user)
      } else {
        user = await GoogleModel.create(newUser)
        done(null, user)
      }
    } catch (err) {
      console.error(err)
    }
  }
)
)
 
passport.serializeUser((user: any, done: any) => {
    done(null, user.id)
    // console.log("This is from serialise")
    // console.log(user)
  })

  passport.deserializeUser((id: any, done: any) => {
    // console.log(`HERE IS THE ID:`)
    // console.log(id)
    GoogleModel.findById(id, (err:any, user:any) => {
      // console.log(user)
      done(err, user)
    })
    // const gUser
  })

}
export default PassportFunction

