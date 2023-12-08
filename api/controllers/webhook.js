import { getUser, givemeusers } from "../app.js"
import Ordersubmitted from "../models/Ordersubmitted.js"
import { io } from "../app.js"
import User from "../models/User.js"

//FOR STANDARD BANK
export const getWebHook = async (req,res) => {
    console.log(req.body)
    res.status(200).json(req.body)
}


//FOR AIRTEL
export const getWebHookAirtel = async (req,res) => {
    console.log(req.body)
    const users = givemeusers()
    const code = req.body.transaction.status_code
    const message = req.body.transaction.message
    const id = req.body.transaction.id
    console.log(users)
    if(code === "TS"){
        try {
            const updatedOrder = await Ordersubmitted.findOneAndUpdate(
                { orderid: id },
                { $set: { status: "Paid" } },
                { new: true }
            );
        
            if (!updatedOrder) {
                return res.status(404).json({ error: "Order not found" });
            }
            //update user
            const updatedUser = await User.findByIdAndUpdate(
                updatedOrder.userid,
                { $set: { cart: [] } }, // Set the 'cart' field to an empty array
                { new: true }
            );
    
            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" });
            }
            //
            const socketID = getUser(updatedOrder.userid)
            io.to(socketID?.socketid).emit("getMessage", {
                code,
                message
            })

        
            return res.status(200).json(updatedOrder); // Add return statement here
        } catch (err) {
            return res.status(500).json({ error: "Operation Failed", errorDetails: err.message });
        }
    }else{
        try {
            const updatedOrder = await Ordersubmitted.findOneAndUpdate(
                { orderid: id },
                { $set: { status: "waiting payment" } },
                { new: true }
            );
        
            if (!updatedOrder) {
                return res.status(404).json({ error: "Order not found" });
            }
            //update user
            const socketID = getUser(updatedOrder.userid)
            io.to(socketID?.socketid).emit("getMessage", {
                code,
                message
            })

        
            return res.status(200).json(updatedOrder); // Add return statement here
        } catch (err) {
            return res.status(500).json({ error: "Operation Failed", errorDetails: err.message });
        }
    }
}


