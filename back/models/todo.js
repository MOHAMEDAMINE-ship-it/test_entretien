const mongoose=require('mongoose');



const TodoSchema = new mongoose.Schema({

title:{
    type:String,
},
Description:{
    type:String,
    
},
finished:{
    type:Boolean,
},
created_at:{
    type:Date,
    default:Date},

    finished_at:{
        type:Date,
    },
    update_at :{
        type:Date,
    }





})

module.exports=mongoose.model('Todo',TodoSchema)