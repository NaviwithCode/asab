import slugify from "slugify"
import categoryModel from "../models/categoryModel.js"

export const createCategoryController = async(req,res)=>{
    try {
      const {name}= req.body
      if(!name){
        return res.status(400).json({message:"Name is required"})
      }  
      const existingCategory = await categoryModel.findOne({name})
      if(existingCategory){
        return res.status(200).send({
            success:true,
            message:"Category already exists",
        })
      }
      const category = await new categoryModel({name,slug:slugify(name)}).save()
      res.status(201).send({
        success:true,
        message:"new category created",
        category
      })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in category",
            error
        })
        
    }
}
// update category
export const updateCategoryController = async(req,res)=>{
try {
    const{name}= req.body
    const {id} = req.params
    const category = await categoryModel.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true})
    res.status(200).send({
        success:true,
        message:"Category updated successfully",
        category
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error while updating category",
        error
    })
    
}
}
// get all category
export const categoryController = async(req,res)=>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"All Category List",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:true,
            message:"Error while at all category"
        })
        
    }
}
// get single category
export const singleCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.find({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"Get Single Category Successfully",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:true,
            message:"Error while getting single categroy"
        })
        
    }
}
// get delete category
export const DeleteCategoryController = async(req,res)=>{
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Categroy Deleted Successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:true,
            message:"Error while delete categroy"
        })
        
    }
}