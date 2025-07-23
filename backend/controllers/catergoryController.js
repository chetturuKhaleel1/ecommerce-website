import Category from '../models/catergoryModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const createCatergory = asyncHandler(async (req, res) => {
  const { name } = req.body || {};

  // ✅ Check if name is missing
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  // ✅ Check if category already exists
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return res.status(400).json({ error: "Category already exists" });
  }

  // ✅ Create and save the new category
  const category = await new Category({ name }).save();

  // ✅ Return created category
  res.status(201).json(category);
});




//upadte controllers
const updateCategory =asyncHandler(async (req,res) => {
    try {

        //get cat by name,id
        const {name} =req.body;
        const {categoryId} =req.params


        //finding

        const category =await Category.findOne({_id:categoryId})

if(!category){
    return res.status(404).json({error:"catergory not found"})



}


//else
//checking database for name and auodte  it

category.name =name;
const  updatedCategory =await category.save();
res.json(updatedCategory);





    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal server error"})
    }
    
})




//remove catergory

const removeCategory =asyncHandler(async (req,res) => {
  try {
    
const removed = await Category.findByIdAndDelete(req.params.categoryId);


//show to user
res.json(removed)

  } catch (error) {
     console.error(error)
        res.status(500).json({error:"Internal server error"})
    }
})


const listCategory =asyncHandler(async (req,res) => {
    try {
        
//get all cat

const all =await Category.find({});
res.json(all);



    } catch (error) {
      console.error(error)
       return res.status(400).json(error.message)
    }
    
})


//read spefic caterory 

const readCatergory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
});


export { createCatergory ,updateCategory,removeCategory,listCategory ,readCatergory   };
