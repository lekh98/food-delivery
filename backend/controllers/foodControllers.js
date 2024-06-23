import foodModel from "../models/foodModel.js"

import fs from 'fs'

//add food item

const addFood = async (req,resp)=>{
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    }) 
    try {
        await food.save();
        resp.json({success:true,message:"Food Added"})
        
    } catch (error) {
        console.log(error)
        resp.json({success:false,message:"Error"})
        
    }

}
// all food list

const listFood = async (req,resp)=>{
    try {
        const foods = await foodModel.find({})
        resp.json({success:true,data:foods})
        
    } catch (error) {
        console.log(error)
        resp.json({success:false,message:"Error"})
        
    }

}
const removeFood = async (req,resp)=>{
    try {
        const food = foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{ console.log("removed from uploads folder") })
        await foodModel.findByIdAndDelete(req.body.id)
        resp.json({success:true,message:"Food Item Deleated"})
        
    } catch (error) {
        console.log(error)
        resp.json({success:false,message:"Error"})
        
    }
    

}
export {addFood,listFood,removeFood}