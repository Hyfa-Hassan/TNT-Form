import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import authenticate from "./middleware/authenticate.js";
import Connection from "./database/db.js";
import Routes from "./routes/routes.js";
import Users from "./schema/reg-schema.js";
const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", Routes);

const PORT = 8000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
Connection(username, password);

// Register User
app.post("/register", async (req, res) => {
  try {
    // get data
    const username = req.body.username;
    const empid = req.body.empid;
    const email = req.body.email;
    const password = req.body.password;

    const createUser = new Users({
      username: username,
      empid: empid,
      email: email,
      password: password,
    });
    
    const created = await createUser.save(); // save method creates the user or inserts the user , brfore saving password will hash
    // console.log(created);
    res.status(200).send("Registered");
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login User
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email);
    const user1 = await Users.findOne({ email: email }); //find if user exists
    if (user1) {
      const isMatching = await bcrypt.compare(password, user1.password); //verify the password

      if (isMatching) {
        const token = await user1.generateToken();
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 86400000),
          httpOnly: true,
        });
        res.status(200).send("LoggedIn");
      } else {
        res.status(400).send("Invalid Credentials");
      }
    } else {
      console.log("bad request");
      res.status(400).send("User not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Authentication
app.get("/auth", authenticate, (req, res) => {});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
