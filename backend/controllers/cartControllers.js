import userModel from "../models/userModel.js";

//add items to user cart

const addToCart = async (req,resp)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        resp.json({sucess:true,message:"Added to cart"})       
    } catch (error) {
        console.log(error);
        resp.json({sucess:false,message:"Error"})
    }

}
// remove item from user cart

const removeFromCart = async(req,resp)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        resp.json({sucess:true,message:"Item Removed Successively"})
    } catch (error) {
        console.log(error);
        resp.json({sucess:false,message:"Error"})
        
    }


}

//fetch user cart data
const getCart = async (req,resp)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        resp.json({sucess:true,cartData})
        
    } catch (error) {
        console.log(error)
        resp.json({sucess:false,message:"Error"})
        
    }

}

export {addToCart,removeFromCart,getCart}