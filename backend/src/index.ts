import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose, { Schema, Document, Model } from 'mongoose';
import * as dotenv from 'dotenv' ; 
import User, { IUser } from './models/User.models';

dotenv.config()


const app = express();
const port = 3001;

app.use(bodyParser.json());


mongoose.connect(`${process.env.MONGO_DB_URI}`, )
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch(err => console.error("Connection error", err));



app.post('/submit-form', async (req: Request, res: Response) => {

  const { name, gender, sleepTime } = req.body;
// add validations for name, gender, and sleepTime
if(!name || !gender || !sleepTime){
  return res.json({message: "Please enter all fields"});
}

  
  
  const user = new User({
    name,
    gender,
    sleepTime,
    // currentDate is automatically set to now
  });

  try {
    await user.save();
    res.send({ success: true, message: 'Data saved successfully', data: req.body });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
