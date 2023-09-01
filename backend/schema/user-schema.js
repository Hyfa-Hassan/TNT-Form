import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  day: String,
  city: String,
  tag: String,
  adults: Number,
  children: Number,
  price: String,
  tourdate: Date,
  inclusion: [
    {
      iconurl: String,
      title: String,
    },
  ],
  itnenary: [
    {
      dayno: String,
      tittle: String,
      imgurl: String,
      description: String,
    },
  ],
});

const user = mongoose.model("formdata", userSchema); //user is table or collection name
export default user;
