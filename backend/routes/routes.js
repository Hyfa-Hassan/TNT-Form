import express from "express";
// import { deleteForm } from "../../myapp2/src/apis/api.js";
// import { editUserDetails } from "../../myapp2/src/apis/api.js";
// import { getUser } from "../../myapp2/src/apis/api.js";
import {
  addUserData,
  getUsers,
  getUser,
  editUser,
  deleteForm,
} from "../controller/user-controller.js";

const router = express.Router();

router.post("/add", addUserData);
router.get("/all", getUsers);
router.get("/:id", getUser);
router.post("/:id", editUser);
router.delete("/:id", deleteForm);

export default router;
