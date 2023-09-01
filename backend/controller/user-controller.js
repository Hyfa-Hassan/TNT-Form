// all callback functions here
import user from "../schema/user-schema.js";
import User from "../schema/user-schema.js";
export const addUserData = async (request, response) => {
  const user = request.body;
  // console.log(user);
  const newUser = new User(user);

  try {
    await newUser.save(); //save()--->saves everything in mongodb
    response.status(201).json(newUser);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  // console.log(req.params.id);
  try {
    const user = await User.find({ _id: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editUser = async (request, response) => {
  let user = request.body;
  const editUser = new User(user);
  try {
    await User.updateOne({ _id: request.params.id }, editUser);
    response.status(201).json(editUser);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const deleteForm = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "form deleted sucessfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
