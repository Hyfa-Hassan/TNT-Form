// authentication is the middleware
// it will check before the response

import Users from "../schema/reg-schema.js";
import jwt from "jsonwebtoken";
const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).send("No token");
    } else {
      const verifyToken = jwt.verify(token, process.env.secret_key);
      const rootUser = await Users.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });
      if (rootUser) {
        res.status(401).send("User not found");
      } else {
        res.status(200).send("Authorized User");
      }
    }
    next();
  } catch (error) {
    res.status(401).send("Error");
    console.log(error);
  }
};
export default authenticate;
