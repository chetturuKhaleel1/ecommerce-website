import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updatCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById

 } from "../controllers/userController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile).put(authenticate,updatCurrentUserProfile)


//admin routes
  //upadte and delete spefic user form admin side 
  router.route('/:id').delete(authenticate,authorizeAdmin,deleteUserById).get(authenticate,authorizeAdmin,getUserById)//speicfic user also

  //upadte user by id
  .put(authenticate,authorizeAdmin,updateUserById)

  export default router;