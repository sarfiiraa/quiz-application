const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add your name"]
    },
    email:{
        type:String,
        required:[true,"Please add user email"],
        unique:[true,"Email address already taken"]
    },
    password:{
        type:String,
        required:[true,"Please enter password"]
    }
},{
    timestamps:true
});
module.exports=mongoose.model("User",userSchema);