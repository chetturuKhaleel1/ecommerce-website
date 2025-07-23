import express from "express";
const router =  express.Router()
import { createCatergory,updateCategory,removeCategory , listCategory ,readCatergory    } from "../controllers/catergoryController.js";
//grabing careted moiddle ware 

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

///goocarete controllers

//authiacte user
router.route('/').post( authenticate, authorizeAdmin,  createCatergory)
router.route('/:categoryId').put( authenticate, authorizeAdmin, updateCategory )


router.route('/:categoryId').delete( authenticate, authorizeAdmin, removeCategory )
export default router

//get all catreioges

router.route("/categories").get(listCategory)

//read specific category

router.route('/:id').get( readCatergory )

//goto controlers