import express from 'express'
import session from 'express-session'
import passport from 'passport'
import MongoStore  from 'connect-mongo'
import { PORT } from './utils/config';
import cors from 'cors'
import authRoute from './routes/authRoute';
import { connectDB } from './database/db';
import PassportFunction from './middleware/googleAuthMiddleware';
import { authenticate } from './middleware/auth.middleware';
import quoteRoute from './routes/quoteRoute';
import { TryCatchMiddleware } from './middleware/TryCatchMiddleware';


export const db = async (): Promise<void> => {
  await connectDB();
};

void db();
const app = express();
app.use(express.json());

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials:true
};
app.use(cors(options));

//Session
app.use(session({
    secret:"hellothere",
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
    cookie: {
      secure: false,
      expires: new Date(Date.now() + 10000*60),
      maxAge: 10000*60,
    },
  }))
  
  // Passport
  app.use(passport.initialize())
  app.use(passport.session())
app.use('/auth',authRoute)
app.use('/api',TryCatchMiddleware(quoteRoute))

app.get("/", (req, res, next) => {
  res.send("<a href='http://localhost:4000/auth/google'>Login with Google</a>");
  next();
});
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)

  PassportFunction(passport)
});